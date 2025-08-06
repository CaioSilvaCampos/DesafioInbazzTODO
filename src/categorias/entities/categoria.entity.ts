import { IsString } from "class-validator";
import { TodosEntity } from "src/todos/entities/todos.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Categorias')
export class CategoriaEntity {
   @PrimaryGeneratedColumn('increment')
   id: number
   
   @Column()
   @IsString()
   nome: string

   @Column()
   @IsString()
   descricao: string

   @CreateDateColumn()
    createdAt?: Date

   @OneToMany(()=> TodosEntity, (todo) => todo.categoria)
    todos: TodosEntity[] 
}
