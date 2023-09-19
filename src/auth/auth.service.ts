import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtoSchema/create-user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/database/schemas/user.schema';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {} //inject monogodb

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
    
}
