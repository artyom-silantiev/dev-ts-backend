import { ModuleItem, ModuleItemType } from './module';

export abstract class Controller extends ModuleItem {
  constructor() {
    super(ModuleItemType.Controller);
  }
}
