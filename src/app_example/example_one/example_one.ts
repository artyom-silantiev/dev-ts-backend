import { Module, createLogger, Service } from '@core';

console.log('module loaded: ', __filename);

export class CatService extends Service {
  logger = createLogger('ExampleOneModule', 'CatService');
  code = '101';

  say() {
    this.logger.log('its cat');
  }
}

export class DogService extends Service {
  logger = createLogger('ExampleOneModule', 'DogService');
  code = '010';

  say() {
    this.logger.log('its dog');
  }
}

export class ExampleOneModule extends Module {
  catService: CatService;
  dogService: DogService;

  constructor() {
    super();

    this.catService = new CatService();
    this.dogService = new DogService();
  }
}

export const exampleOneModule = new ExampleOneModule();
