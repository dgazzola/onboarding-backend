import { Router } from 'express';
import { UserController } from './user.controller';
import { methodNotAllowed } from '../errors/methodNotAllowed';

const userController = new UserController();
const userRouter: Router = Router();

userRouter.route('/sign-in')
  .post((req, res) => userController.login(req, res))  // Explicitly passing the correct types
  .all(methodNotAllowed);
  
userRouter.route('/')
  .put((req, res) => userController.update(req, res))  // Explicitly passing the correct types
  .all(methodNotAllowed);

export { userRouter };