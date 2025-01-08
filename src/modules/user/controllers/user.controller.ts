import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiUtilsService } from '@utils/utils.service';
import { AddPatientDto } from '../dtos/addPatient.dto';
import { ApiResponseT } from '@utils/types';
import { AddUserDto } from '../dtos/addUser.dto';
import JwtAuthGuard from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AllowRoles } from 'src/common/decorators/allowRole.decorator';
import { UserRole } from '@prisma/client';
import { GetUser } from 'src/common/decorators/user.decorator';
import { JwtDto } from 'src/common/dtos/jwt.dto';
import { UserFilterDto } from '../dtos/userFilter.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly apiUtilsSevice: ApiUtilsService,
  ) {}

  @Post('add-patient')
  @AllowRoles(UserRole.HOSPITAL_FOOD_MANAGER, UserRole.DOCTOR)
  async addPatient(@Body() dto: AddPatientDto): Promise<ApiResponseT> {
    const data = await this.userService.addPatient(dto);
    return this.apiUtilsSevice.make_response(
      data,
      'Patient added successfully!',
    );
  }

  @Post('add-staff-member')
  @AllowRoles(UserRole.HOSPITAL_FOOD_MANAGER)
  async addStaffMember(@Body() dto: AddUserDto): Promise<ApiResponseT> {
    const data = await this.userService.addStaffMember(dto);
    return this.apiUtilsSevice.make_response(
      data,
      `${data.user.role} added successfully!`,
    );
  }

  @Get()
  async getUserProfile(@GetUser() dto: JwtDto): Promise<ApiResponseT> {
    const data = await this.userService.getUserProfile(dto);
    return this.apiUtilsSevice.make_response(data);
  }

  @Get('all-users')
  async getUsers(@Query() dto: UserFilterDto): Promise<ApiResponseT> {
    const data = await this.userService.getAllUsers(dto);
    return this.apiUtilsSevice.make_response(data);
  }
}
