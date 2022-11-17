import { AppModule, Service } from '@core';

export class CatService extends Service {
  say() {
    console.log('its cat');
  }
}

export class DogService extends Service {
  say() {
    console.log('its dog');
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
