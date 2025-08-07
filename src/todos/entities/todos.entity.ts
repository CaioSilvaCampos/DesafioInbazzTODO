
import { IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatusEnum } from "../enum/todo.status.enum";
import { CategoriaEntity } from "src/categorias/entities/categoria.entity";

@Entity('Todos')
export class TodosEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    @IsString()
    titulo: string

    @Column({length:255})
    @IsString()
    descricao: string

    @Column({enum: TodoStatusEnum})
    status: TodoStatusEnum

    @ManyToOne(()=> CategoriaEntity, (categoria) => categoria.todos, {eager: true})
    categoria: CategoriaEntity

    @CreateDateColumn()
    createdAt?: Date
}
