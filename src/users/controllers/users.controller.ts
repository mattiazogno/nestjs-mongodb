import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  // users/1
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id); // valido ID, si potrebbe fare nel middleware
    if (!isValid) {
      throw new HttpException(`User not valid with: ${id}`, 404);
    }
    const findUser = await this.userService.getUserById(id);

    if (!findUser) {
      throw new HttpException(`User not found: {id}`, 404);
    }
    return findUser;
  }

  // update di una parte di documenti
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id); // valido ID, si potrebbe fare nel middleware
    if (!isValid) {
      throw new HttpException(`User not valid with: ${id}`, 404);
    }

    return this.userService.updateUser(id, updateUser);
  }
}
