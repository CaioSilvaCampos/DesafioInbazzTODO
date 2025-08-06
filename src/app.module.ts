import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from 'config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { CategoriasModule } from './categorias/categorias.module';
@Module({
  imports: [TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
     }),
     ConfigModule.forRoot({
      isGlobal:true
     }),
     TodosModule,
     CategoriasModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
