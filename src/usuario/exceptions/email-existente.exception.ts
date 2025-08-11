import { BadRequestException } from '@nestjs/common';

export class EmailExistenteException extends BadRequestException {
  constructor(email: string) {
    super(`O email '${email}' já está em uso.`);
  }
}