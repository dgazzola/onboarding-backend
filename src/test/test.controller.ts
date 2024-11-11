import { Request, Response } from 'express';
import { TestService } from './test.service';

export class TestController {
  private service: TestService;

  constructor() {
    this.service = new TestService();
  }
  
  readAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const foundUsers = await this.service.readAll();
      res.status(200).json(foundUsers);
    } catch (error) {
      res.status(500).json({ message: 'Server error'});
    }
  };
}