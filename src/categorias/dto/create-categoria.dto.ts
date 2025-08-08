import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {
    @ApiProperty({example: 'Esporte', description: 'Define o nome da categoria'})
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nome: string

    @ApiProperty({example: 'Categorias sobre esportes', description: 'Breve descrição sobre a categoria'})
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    descricao: string
}
