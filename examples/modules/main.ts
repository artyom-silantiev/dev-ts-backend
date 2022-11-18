import {
  Application,
  Controller,
  Module,
  ModuleItem,
  Router,
  Service,
} from '@core';
import { CazModule, RobotService } from './caz/caz.module';
import { CatService, DogService, FooModule } from './foo/foo.module';

class App extends Application {
  fooModule: FooModule;
  cazModule: CazModule;

  constructor() {
    super();
  }

  async bootstrap() {
    this.fooModule = this.useModule(FooModule);
    this.cazModule = this.useModule(CazModule);

    console.log();
    this.fooModule.getItemByType(CatService).say();
    this.fooModule.getItemByType(DogService).say();

    console.log();
    const dogService = this.fooModule.getItemByType(DogService);
    console.log('dogService is DogService', dogService instanceof DogService);
    console.log('dogService is CatService', dogService instanceof CatService);
    console.log('dogService is FooModule', dogService instanceof FooModule);
    console.log('dogService is Router', dogService instanceof Router);
    console.log('dogService is Controller', dogService instanceof Controller);
    console.log('dogService is Service', dogService instanceof Service);
    console.log('dogService is Module', dogService instanceof Module);
    console.log('dogService is ModuleItem', dogService instanceof ModuleItem);

    console.log();
    this.cazModule.getItemByType(RobotService).say();
    console.log('cazModule imports:', this.cazModule.getImports());
    this.cazModule.getItemByType(CatService).say(); // will throw error
  }
}

const app = new App();
app.start();
