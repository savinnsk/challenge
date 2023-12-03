import { HttpException, HttpStatus } from '@nestjs/common';
export interface RequestError {
  status: number;
  message: string;
}

export class UnauthorizedError extends HttpException {
  constructor(msg?: string) {
    super(`Unauthorized : ${msg}`, HttpStatus.UNAUTHORIZED);
  }
}
