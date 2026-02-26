import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UsersService } from 'src/users/services/users.service';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CursorPaginationDto } from 'src/common/dto/cursor-pagination.dto';

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

  async findAll(pagination?: CursorPaginationDto) {
    const { cursor, limit = 10 } = pagination ?? {};

    if (cursor) {
      const date = new Date(cursor);
      if (Number.isNaN(date.getTime())) {
        throw new BadRequestException('Cursor non è una data ISO valida');
      }
    }

    const filter: any = {};

    let lastId: Types.ObjectId | undefined;
    let cursorDate: Date | undefined;

    if (cursor) {
      cursorDate = new Date(cursor);
      // Opzionale: potresti passare anche l'_id come parte del cursore opaco
      // per ora usiamo solo createdAt + tie-breaker nel sort
      filter.createdAt = { $lt: cursorDate };
    }

    // Fetch limit + 1 per rilevare hasMore
    const docs = await this.orderModel
      .find(filter)
      .sort({ createdAt: -1, _id: -1 }) // ORDINE FISSO + tie-breaker
      .limit(limit + 1)
      .populate('user', 'username displayName avatarUrl')
      .lean() // ← molto importante
      .exec();

    const hasMore = docs.length > limit;
    const results = hasMore ? docs.slice(0, limit) : docs;

    let nextCursor: string | null = null;
    if (results.length > 0) {
      const lastDoc = results[results.length - 1] as any;
      nextCursor = lastDoc.createdAt.toISOString();
    }

    return {
      data: results,
      pageInfo: {
        hasMore,
        nextCursor,
        // se vuoi backward: prevCursor, hasPrevious
      },
    };
  }

  findById(id: string) {
    return this.orderModel.findById(id).populate('user');
  }

  findByUser(userId: string) {
    return this.orderModel.find({ user: userId });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    if ('user' in updateOrderDto) {
      throw new BadRequestException(
        "Non si può modificare id utente dell'Ordine",
      );
    }

    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
      new: true,
      runValidators: true,
    });
  }

  delete(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
