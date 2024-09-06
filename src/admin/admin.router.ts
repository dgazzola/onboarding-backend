import { Router, Request, Response } from 'express';
import { AdminController } from './admin.controller';
import { methodNotAllowed } from '../errors/methodNotAllowed';

const adminController = new AdminController();
const adminRouter: Router = Router();

adminRouter.route('/')
  .get((req: Request, res: Response) => adminController.read(req, res))
  .put((req: Request, res: Response) => adminController.update(req, res))
  .all(methodNotAllowed);

export { adminRouter };