import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosEntity } from './entities/todos.entity';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([TodosEntity]), CategoriasModule,JwtModule.register({}), ConfigModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
