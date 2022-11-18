import { Class, getClassName } from './stuff';
import { symbolModuleImports, symbolModuleTypeId } from './symbols';

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
    const moduleImport = useModule(importModuleType);

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
}

export abstract class ModuleItem {
  constructor() {}
}

let modulesTypesCount = 0;
const modules = {} as {
  [moduleId: number]: any;
};

export function useModule<T>(moduleType: Class<T>) {
  if (!Reflect.hasMetadata(symbolModuleTypeId, moduleType)) {
    const moduleTypeId = modulesTypesCount++;
    Reflect.defineMetadata(symbolModuleTypeId, moduleTypeId, moduleType);
  }

  const moduleTypeId = Reflect.getMetadata(
    symbolModuleTypeId,
    moduleType
  ) as number;
  if (!modules[moduleTypeId]) {
    modules[moduleTypeId] = new moduleType();
  }
  return modules[moduleTypeId] as T;
}
