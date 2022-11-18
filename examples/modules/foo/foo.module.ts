import { Module, createLogger, Service, mergeType } from '@core';
import { CazModule } from '../caz/caz.module';

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
  catService = {} as CatService;
  dogService = {} as DogService;

  constructor() {
    super();
  }

  onStructInit() {
    this.useImport(CazModule);
    mergeType(this.catService, new CatService(this.dogService));
    mergeType(this.dogService, new DogService(this.catService));
  }
}
