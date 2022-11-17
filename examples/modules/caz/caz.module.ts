import { createLogger, Module, Service } from '@core/index';
import { CatService, DogService, fooModule } from '../foo/foo.module';

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

export class CazModule extends Module {
  robotService: RobotService;

  constructor() {
    super();

    const { catService, dogService } = fooModule;

    this.robotService = new RobotService(catService, dogService);
  }
}

export const cazModule = new CazModule();
