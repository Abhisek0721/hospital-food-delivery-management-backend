import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { AddUserDto } from './addUser.dto';

export class AddPatientDto extends AddUserDto {
  @IsString()
  @IsOptional()
  diseases?: string;

  @IsString()
  @IsOptional()
  allergies?: string;

  @IsPositive()
  @IsNotEmpty()
  roomNumber: number;

  @IsPositive()
  @IsNotEmpty()
  bedNumber: number;

  @IsPositive()
  @IsNotEmpty()
  floorNumber: number;

  @IsPositive()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  emergencyContact: string;
}
