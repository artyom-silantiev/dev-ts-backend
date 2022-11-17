import { ModuleItem, AppModuleItemType } from './app_module';

export abstract class Service extends ModuleItem {
  constructor() {
    super(AppModuleItemType.Service);
  }
}
