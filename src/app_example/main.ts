import { Controller, Module, ModuleItem, Router, Service } from '@core';
import {
  exampleOneModule,
  CatService,
  DogService,
  ExampleOneModule,
} from './example_one/example_one';
import { exampleTwoModule, RobotService } from './example_two/example_two';

console.log();
exampleOneModule.getItemByType(CatService).say();
exampleOneModule.getItemByType(DogService).say();

console.log();
const dogService = exampleOneModule.getItemByType(DogService);
console.log('dogService is DogService', dogService instanceof DogService);
console.log('dogService is CatService', dogService instanceof CatService);
console.log(
  'dogService is ExampleOneModule',
  dogService instanceof ExampleOneModule
);
console.log('dogService is Router', dogService instanceof Router);
console.log('dogService is Controller', dogService instanceof Controller);
console.log('dogService is Service', dogService instanceof Service);
console.log('dogService is Module', dogService instanceof Module);
console.log('dogService is ModuleItem', dogService instanceof ModuleItem);

console.log();
exampleTwoModule.getItemByType(RobotService).say();
exampleTwoModule.getItemByType(CatService).say();
