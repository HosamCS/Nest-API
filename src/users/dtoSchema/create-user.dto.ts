import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString() // must call ValidationPipe in controller to apply this validation
    @Length(3 , 20)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('EG')
    phone: string;
  }