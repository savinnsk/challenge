import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
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

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'get all rooms' })
  @ApiCreatedResponse({
    status: 201,
    description: 'get all room successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async getAll(@Request() req: any) {
    const userToken = req.headers['authorization'].split(' ')[1];
    return await this.roomsService.listAllRooms({
      userToken: userToken,
    });
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' } as any)
  @ApiOperation({ summary: 'delete a room' })
  @ApiCreatedResponse({
    status: 201,
    description: 'room deleted room successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async delete(@Request() req: any, @Param('id') id: string) {
    const userToken = req.headers['authorization'].split(' ')[1];
    return await this.roomsService.deleteRoom({
      id,
      userToken: userToken,
    });
  }
}
