import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export abstract class UserCreateDto {
  id?: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @ApiProperty({
    example: 'João',
  })
  name: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @ApiProperty({
    example: 'João123',
  })
  nickname: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @ApiProperty({
    example: 'João',
  })
  password: string;
}
