import { Application } from './app';
import { Class, getClassName } from './stuff';
import { symbolModuleApp, symbolModuleImports } from './symbols';

export abstract class Module {
  constructor() {
    Reflect.defineMetadata(symbolModuleImports, [], this);
  }

  getItemByType<T>(moduleItemType: Class<T>) {
    for (const itemKey in this) {
      if (this[itemKey] instanceof moduleItemType) {
        return this[itemKey] as T;
      }
    }
    throw `${getClassName(moduleItemType)} not found in ${getClassName(
      this.constructor
    )}`;
  }

  protected useImport<T>(importModuleType: Class<T>) {
    const app = Reflect.getMetadata(symbolModuleApp, this) as Application;

    const moduleImport = app.useModule(importModuleType);

    const moduleImports = Reflect.getMetadata(
      symbolModuleImports,
      this
    ) as any[];
    if (moduleImports.indexOf(moduleImport) === -1) {
      moduleImports.push(moduleImport);
    }

    return moduleImport;
  }

  getImports() {
    const moduleImports = Reflect.getMetadata(symbolModuleImports, this);
    return moduleImports.map((x) => x) as Module[];
  }

  abstract onStructInit(): void;
}

export abstract class ModuleItem {
  constructor() {}
}
