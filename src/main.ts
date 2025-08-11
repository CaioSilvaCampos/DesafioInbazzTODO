import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // proibe chaves que nao estao no meu DTO
    forbidNonWhitelisted:true,//gera um erro quando a chave nao existir
    transform: true, 
  }))

  //Config do swagger
  const documentBuilderConfig = new DocumentBuilder().setTitle('Todos API').setDescription('API para uma lista de tarefas').setVersion('1.0').addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, documentBuilderConfig)

  SwaggerModule.setup('docs',app, document)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
