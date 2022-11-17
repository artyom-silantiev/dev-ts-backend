import { ModuleItem, AppModuleItemType } from './app_module';

export abstract class Router extends ModuleItem {
  constructor() {
    super(AppModuleItemType.Router);
  }
}
