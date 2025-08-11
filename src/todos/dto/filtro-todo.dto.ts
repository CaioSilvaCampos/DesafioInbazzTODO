import { IsEnum, IsInt, IsOptional, IsPositive } from "class-validator";
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
    @IsInt()
    @IsPositive()
    categoriaId?: number;
}