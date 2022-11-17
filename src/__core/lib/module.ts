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
