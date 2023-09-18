// service layer
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtoSchema/create-user.dto';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dtoSchema/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/database/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {} //inject monogodb
  private users: UserEntity[] = [];

 async findAll() {
    return await this.userModel.find({},{"__v":false});
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async createUser(CreateUserDto: CreateUserDto) {
    const newUser = new this.userModel({
      ...CreateUserDto,
    });
    const result = await newUser.save();
    console.log(result);

    return result;
  }

  async updateUser(id: string, UpdateUserDto: UpdateUserDto){
    const updateUser = await this.userModel.findByIdAndUpdate(id ,{ $set: {...UpdateUserDto}})
    return updateUser;
  }

  async deleteUser(id: string): Promise<void> {
  await this.userModel.findByIdAndRemove(id);
    
  }
}
