import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { TodoStatusEnum } from "../enum/todo.status.enum";

export class CreateTodoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    titulo: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descricao: string

    @ApiProperty()
    @IsEnum(TodoStatusEnum)
    @IsNotEmpty()
    status: TodoStatusEnum

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    categoriaId: number
}
