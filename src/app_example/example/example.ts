import { AppModule, createLogger, Service } from '../../__core';

console.log('EXAMPLE MODULE IMPORTED !!!');

export class CatService extends Service {
  logger = createLogger('CatService');
  code = '101';

  say() {
    this.logger.log('its cat');
  }
}

export class DogService extends Service {
  logger = createLogger('DogService');
  code = '010';

  say() {
    this.logger.log('its dog');
  }
}

export class ExampleModule extends AppModule {
  catService: CatService;
  dogService: DogService;

  constructor() {
    super();

    this.catService = new CatService();
    this.dogService = new DogService();
  }
}

export const exampleModule = new ExampleModule();
