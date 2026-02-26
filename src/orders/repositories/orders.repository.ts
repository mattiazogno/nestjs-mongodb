import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../schemas/order.schema';
import { CursorPaginationDto } from '../../common/dto/cursor-pagination.dto';

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(dto: any) {
    return this.orderModel.create(dto);
  }

  // keep pagination logic close to DB access
  async findAll(pagination?: CursorPaginationDto) {
    const { cursor, limit = 10 } = pagination ?? {};

    if (cursor) {
      const date = new Date(cursor);
      if (Number.isNaN(date.getTime())) {
        throw new BadRequestException('Cursor non è una data ISO valida');
      }
    }

    const filter: any = {};
    if (cursor) filter.createdAt = { $lt: new Date(cursor) };

    const docs = await this.orderModel
      .find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit + 1)
      .populate('user', 'username displayName avatarUrl')
      .lean()
      .exec();

    const hasMore = docs.length > limit;
    const results = hasMore ? docs.slice(0, limit) : docs;

    let nextCursor: string | null = null;
    if (results.length > 0) {
      const last = results[results.length - 1] as any;
      nextCursor = last.createdAt.toISOString();
    }

    return { data: results, pageInfo: { hasMore, nextCursor } };
  }

  findById(id: string) {
    return this.orderModel.findById(id).populate('user');
  }

  findByUser(userId: string) {
    return this.orderModel.find({ user: userId });
  }

  update(id: string, dto: any) {
    return this.orderModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });
  }

  delete(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  // Custom: recent orders for a user
  findRecentByUser(userId: string, limit = 5) {
    return this.orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }

  // Custom: aggregate totals per user
  async aggregateTotalsByUser(userId: string) {
    const pipeline = [
      { $match: { user: userId } },
      { $group: { _id: '$user', totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } },
    ];
    return this.orderModel.aggregate(pipeline).exec();
  }
}
