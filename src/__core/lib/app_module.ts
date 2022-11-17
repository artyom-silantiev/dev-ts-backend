import { Class, getClassName } from './stuff';

export abstract class AppModule {
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

export enum AppModuleItemType {
  Router = 0,
  Controller = 1,
  Service = 2,
}

export abstract class ModuleItem {
  constructor(private __moduleItemType: AppModuleItemType) {}
}
