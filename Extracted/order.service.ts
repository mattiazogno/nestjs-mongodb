import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UsersService } from 'src/users/services/users.service';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly userService: UsersService,
  ) {}

  // order.service.ts
  async create(createOrderDto: CreateOrderDto) {
    // 1. Verifica esistenza (opzionale ma buona pratica)
    const existUser = await this.userService.getUserById(createOrderDto.user);
    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    // 2. create accetta direttamente il DTO perché user è string
    return this.orderModel.create(createOrderDto);
  }

  findAll() {
    return this.orderModel.find().populate('user', 'username displayName');
  }

  findById(id: string) {
    return this.orderModel.findById(id).populate('user');
  }

  findByUser(userId: string) {
    return this.orderModel.find({ user: userId });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
      new: true,
      runValidators: true,
    });
  }

  delete(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
