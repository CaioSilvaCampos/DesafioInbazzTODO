import { NotFoundException as NestNotFoundException } from '@nestjs/common';

export class NotFoundExceptionById extends NestNotFoundException {
  constructor(entityName: string, id:number) {
    super(`${entityName} com o id ${id} não foi encontrado(a).`);
  }
}