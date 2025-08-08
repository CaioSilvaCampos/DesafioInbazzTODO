import { ApiProperty } from '@nestjs/swagger';
import { CategoriaEntity } from 'src/categorias/entities/categoria.entity';

export class TodosResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  categoria: CategoriaEntity
  
  @ApiProperty()
  createdAt?: Date;
}
