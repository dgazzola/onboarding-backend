import { Request, Response } from 'express';
import { AdminService } from './admin.service';

export class AdminController {
  private service: AdminService;

  constructor() {
    this.service = new AdminService();
  }

  read = async (req: Request, res: Response): Promise<void> => {
    try {
      const admin = await this.service.read();
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const admin = await this.service.update(req.body);
      res.status(201).json(admin)
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
}