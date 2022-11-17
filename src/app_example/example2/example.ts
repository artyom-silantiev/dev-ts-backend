import { AppModule, createLogger, Service } from '../../__core';

import { CatService, DogService, exampleModule } from '../example/example';

console.log('EXAMPLE 2 MODULE IMPORTED !!!');

export class RobotService extends Service {
  logger = createLogger('RobotService');

  constructor(private catService: CatService, private dogService: DogService) {
    super();
  }

  say() {
    this.logger.log('its robot from example 2');
    this.logger.log(`cat code is ${this.catService.code}`);
    this.logger.log(`dog code is ${this.dogService.code}`);
  }
}

export class Example2Module extends AppModule {
  robotService: RobotService;

  constructor() {
    super();

    const { catService, dogService } = exampleModule;

    this.robotService = new RobotService(catService, dogService);
  }
}

export const example2Module = new Example2Module();
