import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtoSchema/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/register')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.AuthService.createUser(CreateUserDto);
  }
}
