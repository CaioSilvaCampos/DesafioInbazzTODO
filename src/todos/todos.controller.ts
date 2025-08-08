import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({
    summary: "Criar uma nova tarefa"
  })
  @ApiBody({
    type: CreateTodoDto
  })
  @ApiResponse({
    status:201, description: 'Tarefa criada com sucesso'
  })
  @ApiResponse({
    status:500, description: 'Erro ao criar tarefa'
  })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as tarefas'
  })
  @ApiResponse({
    status:200, description: 'Lista de tarefas retornadas com sucesso'
  })
  @ApiResponse({
    status:404, description: 'Não existem tarefas cadastradas'
  })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar detalhes de uma tarefa específica'
  })
  @ApiParam({
    name: 'id', description: 'id da tarefa', example: '1'
  })
  @ApiResponse({
    status:200, description: 'Lista a tarefa com o ID informado'
  })
  @ApiResponse({
    status:404, description: 'Não existe uma tarefa com o ID informado'
  })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary:'Atualizar os detalhes de uma tarefa'
  })
  @ApiParam({
    name: 'id', description: 'id da tarefa', example: 1
  })
  @ApiResponse({
    status:201, description: 'Tarefa atualizada com o sucesso!'
  })
  @ApiResponse({
    status:404, description: 'Não existe uma tarefa com o ID informado'
  })
  @ApiBody({
    type: UpdateTodoDto
  })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @ApiOperation({
    summary: 'Excluir uma tarefa'
  })
  @ApiParam({
    name: 'id', description: 'id da tarefa', example: 1
  })
  @ApiResponse({
    status:200, description:'Tarefa excluida com sucesso' 
  })
  @ApiResponse({
    status:404, description: 'Não existe uma tarefa com o ID informado'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
