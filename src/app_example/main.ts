import { exampleModule, CatService } from './example/example';
import { example2Module, RobotService } from './example2/example';

exampleModule.getItemByType(CatService).say();
example2Module.getItemByType(RobotService).say();
example2Module.getItemByType(CatService).say();
