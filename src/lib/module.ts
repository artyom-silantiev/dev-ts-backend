import { Class, getClassName } from './stuff';

const symbolModuleTypeId = Symbol('moduleTypeId');
const symbolModuleImports = Symbol('moduleImports');

export abstract class Module {
  private [symbolModuleImports] = [];

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

    if (this[symbolModuleImports].indexOf(moduleImport) === -1) {
      this[symbolModuleImports].push(moduleImport);
    }

    return moduleImport;
  }

  getImports() {
    return this[symbolModuleImports].map((x) => x) as Module[];
  }
}

export abstract class ModuleItem {
  constructor() {}
}

let modulesTypesCount = 0;
const modules = {} as {
  [moduleHash: string]: any;
};

export function useModule<T>(moduleType: Class<T>) {
  if (!Object.hasOwn(moduleType, symbolModuleTypeId)) {
    const moduleTypeId = modulesTypesCount++;
    Object.defineProperty(moduleType, symbolModuleTypeId, {
      value: moduleTypeId,
    });
  }

  const moduleTypeId = moduleType[symbolModuleTypeId];
  if (!modules[moduleTypeId]) {
    modules[moduleTypeId] = new moduleType();
  }
  return modules[moduleTypeId] as T;
}
