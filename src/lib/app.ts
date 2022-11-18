import Module from 'module';
import { Router } from './router';
import 'reflect-metadata';

export class App {
  constructor(argp: { modules: Module[]; router: Router }) {}
}
