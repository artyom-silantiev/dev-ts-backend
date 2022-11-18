import 'reflect-metadata';
import { Class } from './stuff';
import { symbolModuleApp, symbolModuleTypeId } from './symbols';
import { Module } from './module';

let modulesTypesCount = 0;

export abstract class Application {
  private context = new Context();

  constructor() {}

  async useModule<T>(moduleType: Class<T>) {
    if (!Reflect.hasMetadata(symbolModuleTypeId, moduleType)) {
      const moduleTypeId = modulesTypesCount++;
      Reflect.defineMetadata(symbolModuleTypeId, moduleTypeId, moduleType);
    }

    const moduleTypeId = Reflect.getMetadata(
      symbolModuleTypeId,
      moduleType
    ) as number;
    if (!this.context.modules[moduleTypeId]) {
      const newModule = new moduleType() as Module;
      this.context.modules[moduleTypeId] = newModule;
      Reflect.defineMetadata(symbolModuleApp, this, newModule);

      await newModule.onInit();
    }
    return this.context.modules[moduleTypeId] as T;
  }

  getApplicationContext() {
    return this.context;
  }

  abstract bootstrap(): Promise<void>;

  async start() {
    try {
      await this.bootstrap();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

export class Context {
  modules = {} as {
    [moduleId: number]: any;
  };
}
