import { ApiProperty } from "@nestjs/swagger";

export class CategoriaReponseDto {
    @ApiProperty()
    id: number
    @ApiProperty()
    nome:string

    @ApiProperty()
    descricao:string

    @ApiProperty()
    createdAt? : Date
}