import { UnauthorizedException } from '@nestjs/common';

export class SenhaInvalidaException extends UnauthorizedException {
  constructor() {
    super('Senha inválida.'); 
  }
}