import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
