import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export abstract class CreateRoomDto {
  id?: string;

  @IsString({ message: 'the name should be a string' })
  @ApiProperty({
    example: 'Copa do mundo',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Copa do mundo',
    required: false,
  })
  welcomeMessage?: string;
}
