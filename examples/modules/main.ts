import {
  Controller,
  Module,
  ModuleItem,
  Router,
  Service,
  useModule,
} from '@core';
import { CazModule, RobotService } from './caz/caz.module';
import { CatService, DogService, FooModule } from './foo/foo.module';

const fooModule = useModule(FooModule);
const cazModule = useModule(CazModule);

console.log();
fooModule.getItemByType(CatService).say();
fooModule.getItemByType(DogService).say();

console.log();
const dogService = fooModule.getItemByType(DogService);
console.log('dogService is DogService', dogService instanceof DogService);
console.log('dogService is CatService', dogService instanceof CatService);
console.log('dogService is FooModule', dogService instanceof FooModule);
console.log('dogService is Router', dogService instanceof Router);
console.log('dogService is Controller', dogService instanceof Controller);
console.log('dogService is Service', dogService instanceof Service);
console.log('dogService is Module', dogService instanceof Module);
console.log('dogService is ModuleItem', dogService instanceof ModuleItem);

console.log();
cazModule.getItemByType(RobotService).say();
cazModule.getItemByType(CatService).say(); // will throw error
