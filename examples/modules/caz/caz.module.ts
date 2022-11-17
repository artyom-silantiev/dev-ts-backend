import { createLogger, Module, Service } from '@core';
import { CatService, DogService, FooModule } from '../foo/foo.module';

console.log('module loaded: ', __filename);

export class RobotService extends Service {
  logger = createLogger('CazModule', 'RobotService');

  constructor(private catService: CatService, private dogService: DogService) {
    super();
  }

  say() {
    this.logger.log('its robot');
    this.logger.log(`cat code is ${this.catService.code}`);
    this.logger.log(`dog code is ${this.dogService.code}`);
  }
}

export class CazModule extends Module {
  robotService: RobotService;

  constructor() {
    super();

    const { catService, dogService } = this.useImport(FooModule);

    this.robotService = new RobotService(catService, dogService);

    console.log();
  }
}
