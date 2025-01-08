import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponseT } from '@utils/types';
import { ApiUtilsService } from '@utils/utils.service';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { envConstant } from '@constants/index';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly apiUtilsSevice: ApiUtilsService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponseT> {
    const data = await this.authService.login(loginDto);
    return this.apiUtilsSevice.make_response(data);
  }
}
