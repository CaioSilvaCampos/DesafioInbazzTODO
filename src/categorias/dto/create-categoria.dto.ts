import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nome: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    descricao: string
}
