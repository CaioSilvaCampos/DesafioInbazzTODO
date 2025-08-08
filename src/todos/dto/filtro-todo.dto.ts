import { IsEnum, IsInt, IsOptional } from "class-validator";
import { TodoStatusEnum } from "../enum/todo.status.enum";
import { Type } from "class-transformer";

export class FiltroTodoDto{
    @IsOptional()
    @IsEnum(TodoStatusEnum, {
    message: 'Status deve ser pendente ou concluida',
    })
    status?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'categoriaId deve ser um número inteiro' })
    categoriaId?: number;
}