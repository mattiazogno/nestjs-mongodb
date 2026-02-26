import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Patch,
  Delete
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserSettingsDto } from '../dto/update-setting.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  // users/1
  @Get(':id')
  async getUserById(@Param('id', ParseObjectIdPipe) id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id); // valido ID, si potrebbe fare nel middleware
    if (!isValid) {
      throw new HttpException(`User not valid with: ${id}`, 404);
    }
    const findUser = await this.userService.getUserById(id);

    if (!findUser) {
      throw new HttpException(`User not found: ${id}`, 404);
    }
    return findUser;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // update di una parte di documenti
  @Patch(':id')
  async updateUser(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUser: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id); // valido ID, si potrebbe fare nel middleware
    if (!isValid) {
      throw new HttpException(`User not valid with: ${id}`, 404);
    }

    const updatedUser = await this.userService.updateUser(id, updateUser);
    if (!updatedUser) {
      throw new HttpException(`User not exists with: ${id}`, 404);
    }
    return updatedUser;
  }

  @Patch(':id/settings')
  async putUserSettings(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserSettings: UpdateUserSettingsDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id); // valido ID, si potrebbe fare nel middleware
    if (!isValid) {
      throw new HttpException(`User not valid with: ${id}`, 404);
    }

    const updatedSettings = await this.userService.updateSettings(id, updateUserSettings);
    if (!updatedSettings) {
      throw new HttpException(`User not exists with: ${id}`, 404);
    }
    return updatedSettings;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseObjectIdPipe) id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id); // valido ID, si potrebbe fare nel middleware
    if (!isValid) {
      throw new HttpException(`User not valid with: ${id}`, 404);
    }
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) {
      throw new HttpException(`User not exists with: ${id}`, 404);
    }
    return deletedUser;
  }
}
