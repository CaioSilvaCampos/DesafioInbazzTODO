import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodosEntity } from './entities/todos.entity';
import { Repository } from 'typeorm';
import { CategoriasService } from 'src/categorias/categorias.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodosEntity)
    private readonly todoRepository: Repository<TodosEntity>,
    private readonly categoriasService: CategoriasService
  ){

  }

  async todoExiste(id: number): Promise<TodosEntity>{
    const todo = await this.todoRepository.findOneBy({id})
    if(!todo){
      throw new NotFoundException('Tarefa não encontrada')
    }
    else{
      return todo
    }
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodosEntity> {
    const categoria = await this.categoriasService.categoriaExiste(createTodoDto.categoriaId);
    
    const todo = this.todoRepository.create({
      categoria,
      descricao: createTodoDto.descricao,
      status: createTodoDto.status,
      titulo: createTodoDto.titulo,
    });

  return await this.todoRepository.save(todo);
  }

  async findAll(): Promise<TodosEntity[]> {
    const todos = await this.todoRepository.find()
    if(todos.length == 0){
      throw new NotFoundException('Não existem Tarefas cadastradas')
    }
    return todos
  }

  async findOne(id: number) {
    const todo = await this.todoExiste(id)
    return todo
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodosEntity> {
    const { categoriaId, ...todoDto } = updateTodoDto
    const todo = await this.todoExiste(id)
    if(updateTodoDto.categoriaId){
      const categoria = await this.categoriasService.categoriaExiste(updateTodoDto.categoriaId)
      todo.categoria = categoria
      
    }
    Object.assign(todo, {
      ...todoDto,
      categoria: todo.categoria
    })
    const todoAtualizada = await this.todoRepository.save(todo)
    return todoAtualizada
  }

  async remove(id: number) {
    const todo = await this.todoExiste(id)
    try{
      const result = await this.todoRepository.delete(todo.id)
      return result
    }
    catch(error) {
      throw new InternalServerErrorException('Erro ao deletar uma tarefa')
    }
  }
}
