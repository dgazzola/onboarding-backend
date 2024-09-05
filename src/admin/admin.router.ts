import { Router } from 'express';
import { AdminController } from './admin.controller';
import { methodNotAllowed } from '../errors/methodNotAllowed';

const adminController = new AdminController();
const adminRouter: Router = Router();

adminRouter.route('/')
  .get((req, res) => adminController.read(req, res))
  .put((req, res) => adminController.update(req, res))
  .all(methodNotAllowed);

export { adminRouter };