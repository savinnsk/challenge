import { Controller, Post, Request, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateRoomDto } from './dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'create a new room' })
  @ApiCreatedResponse({
    status: 201,
    description: 'New room created successfully',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid parameters' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async create(@Request() req: any, @Body() createRoomDto: CreateRoomDto) {
    const userToken = req.headers['authorization'].split(' ')[1];
    return await this.roomsService.create({
      userToken: userToken,
      data: createRoomDto,
    });
  }
}
