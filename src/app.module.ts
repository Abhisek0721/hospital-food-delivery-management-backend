import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { SeederService } from './seeders/seeder.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, SeederService],
  exports: [PrismaService, SeederService],
})
export class AppModule {}
