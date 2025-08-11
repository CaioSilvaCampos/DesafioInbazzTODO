import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './entities/categoria.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([CategoriaEntity]), JwtModule.register({}), ConfigModule],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports:[CategoriasService]
})
export class CategoriasModule {}
