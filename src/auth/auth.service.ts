import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { SenhaInvalidaException } from './exceptions/senha-invalida.exception';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private jwtService: JwtService
    ){
    }

    async login(loginDto: loginDto){
        let senhaValida = false
        const usuario = await this.usuarioRepository.findOneBy({
            email:loginDto.email
        })
        if(!usuario){
            throw new NotFoundException('Esse e-mail não está cadastrado no sistema!')
        }
        else{
            senhaValida = await bcrypt.compare(loginDto.password, usuario.passwordHash)
            if(senhaValida){
                const payload = { sub: usuario.id, email: usuario.email };
                const acessToken = await this.jwtService.signAsync(payload)
                return {
                    message: 'Usuário logado com sucesso',
                    acessToken: acessToken}
            }
            else{
                throw new SenhaInvalidaException
            }
        }
    }
}
