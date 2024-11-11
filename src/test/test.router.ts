import { Router, Request, Response } from 'express';
import { TestController } from './test.controller';
import { methodNotAllowed } from '../errors/methodNotAllowed';

const testController = new TestController();
const testRouter: Router = Router();

testRouter.route('/')
  .get((req: Request, res: Response) => testController.readAll(req, res))
  .all(methodNotAllowed);

export { testRouter };