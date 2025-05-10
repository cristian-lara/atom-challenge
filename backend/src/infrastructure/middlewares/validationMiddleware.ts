import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const validateDto = <T extends object>(dtoClass: { new (): T }) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoObject = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const formattedErrors = errors.map((error: ValidationError) => {
        const constraints = error.constraints;
        return {
          property: error.property,
          constraints: constraints ? Object.values(constraints) : []
        };
      });

      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: formattedErrors
      });
      return;
    }

    req.body = dtoObject;
    next();
  };
}; 