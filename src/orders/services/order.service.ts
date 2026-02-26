import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrdersRepository } from '../repositories/orders.repository';
import { UsersService } from '../../users/services/users.service';
import { CursorPaginationDto } from '../../common/dto/cursor-pagination.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
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
    return this.ordersRepository.create(createOrderDto);
  }

  async findAll(pagination?: CursorPaginationDto) {
    return this.ordersRepository.findAll(pagination);
  }

  findById(id: string) {
    return this.ordersRepository.findById(id);
  }

  findByUser(userId: string) {
    return this.ordersRepository.findByUser(userId);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    if ('user' in updateOrderDto) {
      throw new BadRequestException(
        "Non si può modificare id utente dell'Ordine",
      );
    }

    return this.ordersRepository.update(id, updateOrderDto);
  }

  delete(id: string) {
    return this.ordersRepository.delete(id);
  }
}
