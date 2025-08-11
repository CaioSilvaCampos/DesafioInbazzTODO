import { ConflictException } from "@nestjs/common";

export class NomeDuplicadoException extends ConflictException {
    constructor(nome: string){
        super(`Categoria com o nome ${nome} já existe!`)
    }
}