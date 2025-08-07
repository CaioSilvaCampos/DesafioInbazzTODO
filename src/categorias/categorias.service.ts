import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Repository } from 'typeorm';
import { CategoriaEntity } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>
  ){}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<CategoriaEntity> {
    try {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    const categoriaCriada = await this.categoriaRepository.save(categoria);
    
    return categoriaCriada

  } catch (error) {
    throw new InternalServerErrorException('Erro ao criar categoria');
  }
}

  async categoriaExiste(id: number): Promise<CategoriaEntity>{
    const categoria = await this.categoriaRepository.findOneBy({id})
    
    if(!categoria){
      throw new NotFoundException('Nenhuma categoria encontrada!')
    }
    
    return categoria
  }

  async findAll(): Promise<CategoriaEntity[]> {
    const categorias = await this.categoriaRepository.find()
    if(categorias.length == 0){
      throw new NotFoundException('Nenhuma categoria encontrada!')
    }
    else{
      return categorias
    }
  }

  async findOne(id: number): Promise<CategoriaEntity> {
    const categoria = await this.categoriaExiste(id)
    return categoria
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<CategoriaEntity> {
    console.log(updateCategoriaDto)
    const categoria = await this.categoriaExiste(id)
    Object.assign(categoria, updateCategoriaDto)
    const categoriaAtualizada = await this.categoriaRepository.save(categoria)
    return categoriaAtualizada
  }

  async remove(id: number):Promise<void> {
    const categoria = await this.categoriaExiste(id)
    const resultado = this.categoriaRepository.delete(id)
  }
}
