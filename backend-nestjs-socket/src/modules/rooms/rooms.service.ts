import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';

@Injectable()
export class RoomsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: any) {}
}
