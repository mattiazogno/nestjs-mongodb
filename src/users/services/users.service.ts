import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserSettingsDto } from '../dto/update-setting.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.findAll();
  }

  getUserById(id: string) {
    return this.usersRepository.findById(id);
  }

  createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  updateSettings(userId: string, settingsDto: UpdateUserSettingsDto) {
    return this.usersRepository.updateSettings(userId, settingsDto);
  }

  deleteUser(id: string) {
    return this.usersRepository.delete(id);
  }

  // convenience passthroughs for custom repository queries
  findByUsername(username: string) {
    return this.usersRepository.findByUsername(username);
  }

  getWithOrdersCount(userId: string) {
    return this.usersRepository.getWithOrdersCount(userId);
  }
}
