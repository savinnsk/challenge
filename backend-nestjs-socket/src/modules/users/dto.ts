import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export abstract class UserCreateDto {
  id?: string;

  @IsEmail()
  @ApiProperty({
    example: 'joao@gmail.com',
  })
  email: string;

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