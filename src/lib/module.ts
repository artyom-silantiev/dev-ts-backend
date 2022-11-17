import { Class, getClassName } from './stuff';

export abstract class Module {
  getItemByType<T>(moduleItem: Class<T>) {
    for (const itemKey in this) {
      if (this[itemKey] instanceof moduleItem) {
        return this[itemKey] as T;
      }
    }
    throw `${getClassName(moduleItem)} not found in ${getClassName(
      this.constructor
    )}`;
  }
}

export abstract class ModuleItem {
  constructor() {}
}

const symbolModuleTypeId = Symbol('moduleTypeId');
const symbolModuleImports = Symbol('moduleImports');

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

export function useModuleForImport<T>(
  moduleForImport: Module,
  importModuleType: Class<T>
) {
  const moduleImport = useModule(importModuleType);

  let moduleImports = moduleForImport[symbolModuleImports] as any[];
  if (!moduleImports) {
    moduleImports = moduleForImport[symbolModuleImports] = [];
  }

  if (moduleImports.indexOf(moduleImport) === -1) {
    moduleImports.push(moduleImport);
  }

  return moduleImport;
}
