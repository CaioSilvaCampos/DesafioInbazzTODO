import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from 'config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
     }),
     ConfigModule.forRoot({
      isGlobal:true
     }),
     TodosModule,
     CategoriasModule,
     AuthModule,
     UsuarioModule
    ],
  controllers: [AppController],
})
export class AppModule {}
