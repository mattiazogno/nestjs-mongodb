import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserSettingsDto } from '../dto/create-setting.dto';
import { UpdateUserSettingsDto } from '../dto/update-setting.dto';

@Injectable()
export class UsersService {
  //
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      returnDocument: 'after',
    });
  }

  updateSettings(userId: string, settingsDto: UpdateUserSettingsDto) {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: { settings: settingsDto } },
        { returnDocument: 'after', runValidators: true },
      );
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
