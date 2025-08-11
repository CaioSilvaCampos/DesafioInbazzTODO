import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, BadRequestException } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Categorias')
@Controller('categories')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Categoria com nome duplicado' })
  @ApiResponse({ status: 401, description: 'Não autorizado (token inválido ou ausente)' })
  @ApiResponse({ status: 500, description: 'Erro ao criar categoria' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  @ApiResponse({ status: 200, description: 'Lista de categorias retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Nenhuma categoria encontrada' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar uma categoria específica' })
  @ApiParam({ name: 'id', description: 'ID da categoria', example: 1 })
  @ApiResponse({ status: 200, description: 'Categoria encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar informações de uma categoria' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID da categoria', example: 1 })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Categoria com nome duplicado' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar categoria' })
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    if (Object.keys(updateCategoriaDto).length === 0) {
      throw new BadRequestException('O corpo da requisição não pode estar vazio');
    }
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir uma categoria' })
  @ApiParam({ name: 'id', description: 'ID da categoria', example: 1 })
  @ApiResponse({ status: 200, description: 'Categoria excluída com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro ao excluir categoria' })
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}