import {
  exampleOneModule,
  CatService,
  DogService,
} from './example_one/example_one';
import { exampleTwoModule, RobotService } from './example_two/example_two';

exampleOneModule.getItemByType(CatService).say();
exampleOneModule.getItemByType(DogService).say();

exampleTwoModule.getItemByType(RobotService).say();
exampleTwoModule.getItemByType(CatService).say();
