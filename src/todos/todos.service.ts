import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodosEntity } from './entities/todos.entity';
import { Repository } from 'typeorm';
import { CategoriasService } from 'src/categorias/categorias.service';
import { NotFoundExceptionById } from 'src/common/exceptions/not-foundById.exception';
import { TodosResponseDto } from './dto/todos-response.dto';
import { FiltroTodoDto } from './dto/filtro-todo.dto';

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
      throw new NotFoundExceptionById('Tarefa', id)
    }
    else{
      return todo
    }
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodosResponseDto> {
    const categoria = await this.categoriasService.categoriaExiste(createTodoDto.categoriaId);
    
    try{const todo = this.todoRepository.create({
      categoria,
      descricao: createTodoDto.descricao,
      status: createTodoDto.status,
      titulo: createTodoDto.titulo,
    });

    return await this.todoRepository.save(todo);}
    catch(error){
      throw new InternalServerErrorException('Erro ao criar a tarefa')
    }
  }

  async findAll(filtros: FiltroTodoDto) {
    
    const query = this.todoRepository.createQueryBuilder('todo')
      .leftJoinAndSelect('todo.categoria', 'categoria');

    if (filtros.status) {
      query.andWhere('todo.status = :status', { status: filtros.status });
    }

    if (filtros.categoriaId) {
      const categoria = await this.categoriasService.categoriaExiste(filtros.categoriaId)
      query.andWhere('categoria.id = :categoriaId', { categoriaId: categoria.id });
    }

    query.orderBy('todo.createdAt', 'ASC')
    const tarefas = await query.getMany();

    if (tarefas.length === 0) {
      throw new NotFoundException('Nenhuma tarefa encontrada com os filtros informados');
    }

    return tarefas;
  }

  async findOne(id: number) {
    const todo = await this.todoExiste(id)
    return todo
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodosResponseDto> {
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
