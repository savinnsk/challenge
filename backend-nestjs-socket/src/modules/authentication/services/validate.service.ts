import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';

@Injectable()
export class ValidateUserService {
  constructor(private prisma: PrismaService) {}

  async execute({ email }: any) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existUser) {
      existUser.password = undefined;
      return existUser;
    }

    return null;
  }
}
