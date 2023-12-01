import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export abstract class UserCreateDto {
  id?: string;

  @IsEmail()
  @ApiProperty({
    example: 'joao@gmail.com',
    required: true,
  })
  email: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @ApiProperty({
    example: 'João',
    required: true,
  })
  name: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @ApiProperty({
    example: 'João123',
    required: true,
  })
  nickname: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @ApiProperty({
    example: 'João',
    required: true,
  })
  password: string;
}

export abstract class LoginUserDto {
  @IsString()
  @ApiProperty({
    example: 'joao@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'joao123',
  })
  password: string;
}
