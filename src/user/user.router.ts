import { Router } from 'express';
import { UserController } from './user.controller';
import { methodNotAllowed } from '../errors/methodNotAllowed';

const userController = new UserController();
const userRouter: Router = Router();

userRouter.route('/sign-in')
  .post((req, res) => userController.login(req, res))
  .all(methodNotAllowed);
  
userRouter.route('/')
  .get((req, res) => userController.readAll(req, res))
  .put((req, res) => userController.update(req, res))
  .all(methodNotAllowed);

export { userRouter };