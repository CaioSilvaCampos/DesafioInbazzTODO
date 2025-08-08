import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { TodoStatusEnum } from "../enum/todo.status.enum";

export class CreateTodoDto {
    @ApiProperty({example: 'Ir a academia', description: 'Define o titulo da tarefa'})
    @IsString()
    @IsNotEmpty()
    titulo: string

    @ApiProperty({example: 'Academia pela parte da manhã', description: 'Descrição da tarefa'})
    @IsString()
    @IsNotEmpty()
    descricao: string

    @ApiProperty({examples:['pendente', 'concluida'], enum:TodoStatusEnum, description: 'Define o status da tarefa'})
    @IsEnum(TodoStatusEnum)
    @IsNotEmpty()
    status: TodoStatusEnum

    @ApiProperty({example:1, description: 'Id da categoria da tarefa'})
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    categoriaId: number
}
