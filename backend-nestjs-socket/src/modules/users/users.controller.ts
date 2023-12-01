import { Body, Controller, Res, Post } from '@nestjs/common';
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
  async create(@Body() data: UserCreateDto, @Res() res) {
    const response: any = await this.usersService.create(data);

    if (response.status && response.message) {
      res.status(response.status).send(response.message);
    }
    return response;
  }
}
