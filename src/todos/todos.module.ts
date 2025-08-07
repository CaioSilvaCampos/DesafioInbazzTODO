import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosEntity } from './entities/todos.entity';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({
  imports:[TypeOrmModule.forFeature([TodosEntity]), CategoriasModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
