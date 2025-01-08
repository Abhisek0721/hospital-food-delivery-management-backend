import { Module } from '@nestjs/common';
import { ApiUtilsService } from '@utils/utils.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, ApiUtilsService, UserService],
})
export class AuthModule {}
