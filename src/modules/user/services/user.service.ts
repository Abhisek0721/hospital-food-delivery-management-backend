import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AddPatientDto } from '../dtos/addPatient.dto';
import { AddUserDto } from '../dtos/addUser.dto';
import { UserRole } from '@prisma/client';
import { JwtDto } from 'src/common/dtos/jwt.dto';
import { UserFilterDto } from '../dtos/userFilter.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async addPatient(data: AddPatientDto) {
    try {
      const existingUser = await this.prisma.user.count({
        where: { email: data.email?.toLowerCase() },
      });

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      if (data.role !== 'PATIENT') {
        throw new BadRequestException(
          'User is not assigned as a patient role!',
        );
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const createdUser = await this.prisma.user.create({
        data: {
          fullName: data.fullName,
          email: data.email?.toLowerCase(),
          password: hashedPassword,
          contactInfo: data.contactInfo,
          role: data.role,
          location: data.location,
          patients: {
            create: {
              age: data.age,
              bedNumber: data.bedNumber,
              emergencyContact: data.emergencyContact,
              floorNumber: data.floorNumber,
              gender: data.gender,
              roomNumber: data.roomNumber,
              allergies: data.allergies,
              diseases: data.diseases,
            },
          },
        },
      });

      return {
        user: createdUser,
      };
    } catch (error) {
      if (error.statusCode === 500) {
        Logger.error(error?.stack);
      }
      throw error;
    }
  }

  async addStaffMember(data: AddUserDto) {
    try {
      const existingUser = await this.prisma.user.count({
        where: { email: data.email?.toLowerCase() },
      });

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const customDataInsert: any = {};

      switch (data.role) {
        case UserRole.DELIVERY_PERSONNEL:
          customDataInsert.deliveryPersonnel = {
            create: {},
          };
          break;
        case UserRole.PANTRY_STAFF:
          customDataInsert.pantryStaff = {
            create: {},
          };
          break;
        default:
          break;
      }

      const createdUser = await this.prisma.user.create({
        data: {
          fullName: data.fullName,
          email: data.email?.toLowerCase(),
          password: hashedPassword,
          contactInfo: data.contactInfo,
          role: data.role,
          location: data.location,
          ...customDataInsert,
        },
      });

      return {
        user: createdUser,
      };
    } catch (error) {
      if (error.statusCode === 500) {
        Logger.error(error?.stack);
      }
      throw error;
    }
  }

  async getUserProfile(jwtDto: JwtDto) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: jwtDto.userId,
        },
      });
      return user;
    } catch (error) {
      if (error.statusCode === 500) {
        Logger.error(error?.stack);
      }
      throw error;
    }
  }

  async getAllUsers(dto: UserFilterDto) {
    try {
      let limit: number = 10,
        pageNumber: number = 1;
      if (dto.limit && Number(dto.limit) > 1) {
        limit = Number(dto.limit);
      }
      if (dto.pageNumber && Number(dto.pageNumber) > 1) {
        pageNumber = Number(dto.pageNumber);
      }

      const users = await this.prisma.user.findMany({
        where: {
          role: dto.role,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          contactInfo: true,
          role: true,
          location: true,
          deliveryPersonnel: true,
          pantryStaff: true,
          patients: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: pageNumber * limit,
      });
      
      return users;
    } catch (error) {
      if (error.statusCode === 500) {
        Logger.error(error?.stack);
      }
      throw error;
    }
  }
}
