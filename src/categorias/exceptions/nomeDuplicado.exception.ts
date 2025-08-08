import { BadRequestException } from "@nestjs/common";

export class NomeDuplicadoException extends BadRequestException {
    constructor(nome: string){
        super(`Categoria com o nome ${nome} já existe!`)
    }
}