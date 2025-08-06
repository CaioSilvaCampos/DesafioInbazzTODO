import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

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
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as tarefas'
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
