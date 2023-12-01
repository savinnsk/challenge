import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({
    status: 201,
    description: 'New user created successfully',
  })
  @ApiBadRequestResponse({ status: 400, description: 'User Already exist' })
  async create(@Body() data: UserCreateDto) {
    return this.usersService.create(data);
  }
}
