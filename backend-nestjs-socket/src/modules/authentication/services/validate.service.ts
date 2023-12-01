import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';

@Injectable()
export class ValidateUserService {
  constructor(private prisma: PrismaService) {}

  async execute({ email }: any) {
    const user = await this.prisma.user.findFirst(email);

    if (user) {
      user.password = undefined;
      return user;
    }

    return null;
  }
}
