import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, Matches } from "class-validator";

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

    @IsString()
    @Length(6 , 25)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    @IsNotEmpty()
    password: string;
  }