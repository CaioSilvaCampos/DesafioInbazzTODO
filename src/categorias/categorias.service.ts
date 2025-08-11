import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Repository } from 'typeorm';
import { CategoriaEntity } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { NotFoundExceptionById } from 'src/common/exceptions/not-foundById.exception';
import { NomeDuplicadoException } from './exceptions/nomeDuplicado.exception';
import { CategoriaReponseDto } from './dto/categorias-response.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>
  ){}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<CategoriaReponseDto> {
    await this.validarNomeUnico(createCategoriaDto.nome)
    try {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  } 
   catch (error) {
    throw new InternalServerErrorException('Erro ao criar categoria');
  }
}

  async validarNomeUnico(nome: string): Promise<void>{
    const categoria = await this.categoriaRepository.findOneBy({nome})
    if(categoria){
      throw new NomeDuplicadoException(nome)
    }
  }

  async categoriaExiste(id: number): Promise<CategoriaEntity>{
    const categoria = await this.categoriaRepository.findOneBy({id})
    
    if(!categoria){
      throw new NotFoundExceptionById('Categoria', id)
    }
    
    return categoria
  }

  async findAll(): Promise<CategoriaReponseDto[]> {
    const categorias = await this.categoriaRepository.find({
      order:{
        createdAt: 'ASC'
      }
    })
    if(categorias.length == 0){
      throw new NotFoundException('Nenhuma categoria encontrada!')
    }
    else{
      return categorias
    }
  }

  async findOne(id: number): Promise<CategoriaReponseDto>{
    const categoria = await this.categoriaExiste(id)
    return categoria
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<CategoriaReponseDto> {
    const categoria = await this.categoriaExiste(id)
    Object.assign(categoria, updateCategoriaDto)
    const categoriaAtualizada = await this.categoriaRepository.save(categoria)
    return categoriaAtualizada
  }

  async remove(id: number){
    const categoria = await this.categoriaExiste(id)
    try{
      const result = await this.categoriaRepository.delete(categoria.id)
      return {
        message: 'Categoria deletada com sucesso',
      }
    }
    catch(error) {
      throw new InternalServerErrorException('Erro ao deletar uma categoria')
    }
  }
}
