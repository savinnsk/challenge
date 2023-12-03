import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginService } from './services/login.service';
import { LoginUserDto } from '../users/dto';
import { AuthRequest } from 'src/domain/request-dto';

@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'sign-in with a valid user',
    description: 'Use your credentials to login and get access token.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful authentication',
    type: LoginUserDto,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid parameters, Email or password incorrect',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  @ApiBody({
    type: LoginUserDto,
  })
  @Post()
  async login(@Request() req: AuthRequest) {
    return await this.loginService.execute({ user: req.user });
  }
}
