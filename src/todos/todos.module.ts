import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosEntity } from './entities/todos.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TodosEntity])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
