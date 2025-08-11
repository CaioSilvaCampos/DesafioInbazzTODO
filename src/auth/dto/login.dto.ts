import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class loginDto {
      @ApiProperty({ example: 'usuario@example.com' })
      @IsEmail({}, { message: 'Informe um email válido' })
      email: string;
    
      @ApiProperty({ example: 'senhaSegura123' })
      @IsNotEmpty({ message: 'Senha é obrigatória' })
      @MinLength(6, { message: 'Senha precisa ter no mínimo 6 caracteres' })
      password: string;
}