import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entities/usuario.entity';  // ajuste o caminho conforme seu projeto
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { EmailExistenteException } from './exceptions/email-existente.exception';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    const { email, password } = createUsuarioDto;

    const userExists = await this.usuarioRepository.findOneBy({ email });
    if (userExists) {
      throw new EmailExistenteException(createUsuarioDto.email)
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const usuario = this.usuarioRepository.create({
      email,
      passwordHash: hashedPassword,
    });

    return this.usuarioRepository.save(usuario);
  }

  async 
}
