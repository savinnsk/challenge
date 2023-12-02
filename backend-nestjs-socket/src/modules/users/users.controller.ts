import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto, UserUpdateDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({
    status: 200,
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

  @ApiBearerAuth()
  @Put()
  @ApiOperation({ summary: 'update user' })
  @ApiCreatedResponse({
    status: 200,
    description: 'user updated successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async update(@Body() data: UserUpdateDto, @Req() req) {
    const userToken = req.headers['authorization'].split(' ')[1];
    return await this.usersService.update({ data, userToken });
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'get user logged' })
  @ApiCreatedResponse({
    status: 200,
    description: 'get user successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async get(@Req() req) {
    const userToken = req.headers['authorization'].split(' ')[1];
    return await this.usersService.getUser({ userToken });
  }

  @ApiBearerAuth()
  @Delete()
  @ApiOperation({ summary: 'delete a user logged' })
  @ApiCreatedResponse({
    status: 201,
    description: 'user deleted successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async delete(@Req() req) {
    const userToken = req.headers['authorization'].split(' ')[1];
    return await this.usersService.deleteUser({ userToken });
  }
}
