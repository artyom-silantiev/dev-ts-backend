import { Module, createLogger, Service } from '@core';

console.log('module loaded: ', __filename);

export class CatService extends Service {
  logger = createLogger('FooModule', 'CatService');
  code = '101';

  constructor(private dogService: DogService) {
    super();
  }

  say() {
    this.logger.log(`its cat, dog code is ${this.dogService.code}`);
  }
}

export class DogService extends Service {
  logger = createLogger('FooModule', 'DogService');
  code = '010';

  constructor(private catService: CatService) {
    super();
  }

  say() {
    this.logger.log(`its dog, cat code is ${this.catService.code}`);
  }
}

export class FooModule extends Module {
  catService: CatService;
  dogService: DogService;

  constructor() {
    super();

    const _dogService = {};
    this.catService = new CatService(_dogService as DogService);
    this.dogService = new DogService(this.catService);
    Object.assign(_dogService, this.dogService);
  }
}
