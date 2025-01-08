import { UserRole } from '@prisma/client';
import {
  IsEnum,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class UserFilterDto {
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @IsNumberString()
  @IsOptional()
  pageNumber: string;
  
  @IsNumberString()
  @IsOptional()
  limit: string;
}
