import { Module, createLogger, Service } from '@core';

console.log('module loaded: ', __filename);

export class CatService extends Service {
  logger = createLogger('FooModule', 'CatService');
  code = '101';

  say() {
    this.logger.log('its cat');
  }
}

export class DogService extends Service {
  logger = createLogger('FooModule', 'DogService');
  code = '010';

  say() {
    this.logger.log('its dog');
  }
}

export class FooModule extends Module {
  catService: CatService;
  dogService: DogService;

  constructor() {
    super();

    this.catService = new CatService();
    this.dogService = new DogService();
  }
}

export const fooModule = new FooModule();
