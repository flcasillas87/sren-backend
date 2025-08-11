import { Request, Response } from 'express';

export const agregarCentral = (_: Request, res: Response) => {
  res.json({ message: 'Agregar Central' });
};
