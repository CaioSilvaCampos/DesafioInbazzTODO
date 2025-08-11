import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { loginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Autenticação') 
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza login e retorna um token JWT' })
  @ApiBody({ type: loginDto })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido, retorna o token JWT' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ApiResponse({ status: 400, description: 'Dados inválidos no corpo da requisição' })
  async login(@Body() loginDto: loginDto) {
    return await this.authService.login(loginDto);
  }
}
