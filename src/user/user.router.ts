import { Router, Request, Response } from 'express';
import { UserController } from './user.controller';
import { methodNotAllowed } from '../errors/methodNotAllowed';

const userController = new UserController();
const userRouter: Router = Router();

userRouter.route('/sign-in')
  .post((req: Request, res: Response) => userController.login(req, res))
  .all(methodNotAllowed);

userRouter.route('/')
  .get((req: Request, res: Response) => userController.readAll(req, res))
  .put((req: Request, res: Response) => userController.update(req, res))
  .all(methodNotAllowed);

export { userRouter };