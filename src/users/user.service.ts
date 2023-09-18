// service layer
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtoSchema/create-user.dto';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dtoSchema/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/database/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {} //inject monogodb
  private users: UserEntity[] = [];

  async findAll() {
    return await this.userModel.find({}, { __v: false });
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async createUser(CreateUserDto: CreateUserDto) {
    // check if user already exists

    const existingUser = await this.userModel
      .findOne({ email: CreateUserDto.email })
      .exec();
    if (!existingUser) {
      const hashPassword = await bcrypt.hash(CreateUserDto.password, 12);
      const newUser = new this.userModel({
        ...CreateUserDto,
        password: hashPassword,
      });
      const result = await newUser.save();
      console.log(result);

      return result;
    } else {
      throw new ConflictException('User with this email already exists');
    }
  }

  async updateUser(id: string, UpdateUserDto: UpdateUserDto) {
    const updateUser = await this.userModel.findByIdAndUpdate(id, {
      $set: { ...UpdateUserDto },
    });
    return updateUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id);
  }
}
