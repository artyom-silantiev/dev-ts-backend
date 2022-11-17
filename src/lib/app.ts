import Module from 'module';
import { Router } from './router';

export class App {
  constructor(argp: { modules: Module[]; router: Router }) {}
}
