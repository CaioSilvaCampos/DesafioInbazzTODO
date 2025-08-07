import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './entities/categoria.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoriaEntity])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports:[CategoriasService]
})
export class CategoriasModule {}
