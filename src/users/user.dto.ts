import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UserCreateRequestDTO {
  @IsEmail()
  email: string;
  
  @IsString()
  @IsStrongPassword()
  password: string;
}

export class UserUpdateRequestDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsOptional()
  password: string;
}