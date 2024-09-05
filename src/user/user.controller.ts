import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.service.login(req.body);

      if (user === false) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedUser = await this.service.update(req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error'});
    }
  };
}