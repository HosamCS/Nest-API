import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtoSchema/create-user.dto';
import { UpdateUserDto } from './dtoSchema/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service'


@Controller('users')
export class UsersController {
  private users: UserEntity[] = [];
  constructor(private UserService: UserService){}

  @Get()
  findAll(){
   return this.UserService.findAll()
  }

  @Get(':id')
  findUser(@Param('id') id: string): any {
   return this.UserService.findById(id)
  }

  @Post('/register')
  // control body parameters ===> (DTO) data transfer object
  createUser(@Body() CreateUserDto: CreateUserDto) {
   return this.UserService.createUser(CreateUserDto)
  }

  @Patch(':id')
  // @UsePipes(ValidationPipe) // call in main globaly to apply validation in all application
  updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.UserService.updateUser(id, UpdateUserDto)
  }

  @Delete(':id')
  @HttpCode(204)
  removeUser(@Param('id') id: string) {
   return this.UserService.deleteUser(id)
  }
}
