import { IsEmail, IsLowercase, IsString, Length } from "class-validator";

const MIN_LENGTH = 1;
const MAX_LENGTH = 20;

export class NewUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(MIN_LENGTH, MAX_LENGTH)
  password!: string;

  @Length(MIN_LENGTH, MAX_LENGTH)
  @IsLowercase()
  firstName!: string;

  @Length(MIN_LENGTH, MAX_LENGTH)
  @IsLowercase()
  lastName!: string;
}
