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

  async create(createOrderDto: CreateOrderDto) {
    const existUser = await this.userService.getUserById(createOrderDto.user);
    if (!existUser) {
      throw new BadRequestException('User not found');
    }
    return this.ordersRepository.create(createOrderDto);
  }

  async findAll(pagination?: CursorPaginationDto) {
    const { cursor, limit = 10 } = pagination ?? {};

    // Validazione applicativa del cursor
    if (cursor) {
      const date = new Date(cursor);
      if (Number.isNaN(date.getTime())) {
        throw new BadRequestException('Cursor non è una data ISO valida');
      }
    }

    // Costruzione filtro
    const filter: Record<string, any> = {};
    if (cursor) filter.createdAt = { $lt: new Date(cursor) };

    // Fetch limit+1 per determinare hasMore
    const docs = await this.ordersRepository.findAllFromCursor(filter, limit + 1);

    // Logica di paginazione
    const hasMore = docs.length > limit;
    const results = hasMore ? docs.slice(0, limit) : docs;
    const nextCursor =
      results.length > 0
        ? (results[results.length - 1] as any).createdAt.toISOString()
        : null;

    return { data: results, pageInfo: { hasMore, nextCursor } };
  }

  async findById(id: string) {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Ordine con id ${id} non trovato`);
    }
    return order;
  }

  async findByUser(userId: string) {
    // Verifica che l'utente esista prima di cercare i suoi ordini
    const existUser = await this.userService.getUserById(userId);
    if (!existUser) {
      throw new NotFoundException('User not found');
    }
    return this.ordersRepository.findByUser(userId);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    if ('user' in updateOrderDto) {
      throw new BadRequestException("Non si può modificare l'utente di un ordine");
    }
    const updated = await this.ordersRepository.update(id, updateOrderDto);
    if (!updated) {
      throw new NotFoundException(`Ordine con id ${id} non trovato`);
    }
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.ordersRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Ordine con id ${id} non trovato`);
    }
    return deleted;
  }

  async findRecentByUser(userId: string, limit = 5) {
    const existUser = await this.userService.getUserById(userId);
    if (!existUser) {
      throw new NotFoundException('User not found');
    }
    return this.ordersRepository.findRecentByUser(userId, limit);
  }

  async aggregateTotalsByUser(userId: string) {
    const existUser = await this.userService.getUserById(userId);
    if (!existUser) {
      throw new NotFoundException('User not found');
    }
    return this.ordersRepository.aggregateTotalsByUser(userId);
  }
}