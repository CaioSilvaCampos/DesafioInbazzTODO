import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Mensagem inicial da API' })
  @ApiResponse({
    status: 200,
    description:
      'Mensagem de boas-vindas e instrução para acessar o Swagger',
    schema: {
      example:
        'Bem vindo a API de Todos para o desafio da inbazz. Para acessar o swagger, acesse a rota /docs',
    },
  })
  getHello(): string {
    return 'Bem vindo a API de Todos para o desafio da inbazz. Para acessar o swagger, acesse a rota /docs';
  }
}
