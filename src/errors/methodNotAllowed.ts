import { Request, Response, NextFunction } from 'express';

export function methodNotAllowed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}