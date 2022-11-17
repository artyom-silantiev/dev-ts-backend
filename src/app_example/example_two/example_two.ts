import { AppModule, createLogger, Service } from '../../__core';

import {
  CatService,
  DogService,
  exampleOneModule,
} from '../example_one/example_one';

console.log('module loaded: ', __filename);

export class RobotService extends Service {
  logger = createLogger('ExampleTwoModule', 'RobotService');

  constructor(private catService: CatService, private dogService: DogService) {
    super();
  }

  say() {
    this.logger.log('its robot from example 2');
    this.logger.log(`cat code is ${this.catService.code}`);
    this.logger.log(`dog code is ${this.dogService.code}`);
  }
}

export class ExampleTwoModule extends AppModule {
  robotService: RobotService;

  constructor() {
    super();

    const { catService, dogService } = exampleOneModule;

    this.robotService = new RobotService(catService, dogService);
  }
}

export const exampleTwoModule = new ExampleTwoModule();
