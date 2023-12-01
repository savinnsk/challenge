import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { ValidateUserService } from './services/validate.service';
import { LoginService } from './services/login.service';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { expiresIn: configService.get<string>('jwtExpiresIn') },
      }),
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, ValidateUserService, LoginService],
  exports: [ValidateUserService, LoginService],
  controllers: [],
})
export class AuthModule {}
