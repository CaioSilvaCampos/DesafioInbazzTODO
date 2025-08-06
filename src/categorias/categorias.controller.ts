import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova categoria'
  })
  @ApiBody({
    type: CreateCategoriaDto
  })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }
  
  @Get()
  @ApiOperation({
    summary: 'Listar todas as categorias'
  })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar uma categoria especifíca'
  })
  @ApiParam({
    name: 'id', description: 'id da categoria', example: 1
  })
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar informações de uma categoria'
  })
  @ApiParam({
    name: 'id', description: 'id da categoria', example: 1
  })
  @ApiBody({
    type: UpdateCategoriaDto
  })
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @ApiOperation({
    summary: 'Excluir uma categoria'
  })
  @ApiParam({
    name: 'id', description: 'id da categoria', example: 1
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
