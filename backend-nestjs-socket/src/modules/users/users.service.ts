import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto';

@Injectable()
export class UsersService {
  async create(data: UserCreateDto) {}
}
