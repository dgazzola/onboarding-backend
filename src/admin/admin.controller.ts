import { Request, Response } from 'express';
import { AdminService } from './admin.service';

export class AdminController {
  private service: AdminService;

  constructor() {
    this.service = new AdminService();
  }

  read = async (req: Request, res: Response): Promise<void> => {
    console.log('admin api read')
    try {
      const admin = await this.service.read();
      // console.log('controller found admin:', admin)
      res.status(200).json(admin)
    } catch (error) {
      // Handle any errors
      res.status(500).json({ message: 'Server error' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    console.log('admin api update:', req.body)
    try {
      const admin = await this.service.update(req.body);
      res.status(201).json(admin)
    } catch (error) {
      // Handle any errors
      res.status(500).json({ message: 'Server error' });
    }
  };
}