import { Body, Controller, Post, Res } from '@nestjs/common';
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
  @ApiBadRequestResponse({ status: 409, description: 'User Already exist' })
  async create(@Body() data: UserCreateDto, @Res() res) {
    try {
      const response = await this.usersService.create(data);
      return res.status(201).json(response);
    } catch (e) {
      return res.status(e.status).json(e.response);
    }
  }
}
