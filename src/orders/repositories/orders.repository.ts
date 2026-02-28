import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../schemas/order.schema';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  create(dto: CreateOrderDto) {
    return this.orderModel.create(dto);
  }

  // Restituisce cursor grezzo: nessuna trasformazione, nessuna validazione
  findAllFromCursor(filter: Record<string, any>, limit: number) {
    return this.orderModel
      .find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit)
      .populate('user', 'username displayName avatarUrl')
      .lean()
      .exec();
  }

  findById(id: string) {
    return this.orderModel.findById(id).populate('user').lean().exec();
  }

  findByUser(userId: string) {
    return this.orderModel.find({ user: userId }).lean().exec();
  }

  findRecentByUser(userId: string, limit = 5) {
    return this.orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
  }

  update(id: string, dto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).lean().exec();
  }

  delete(id: string) {
    return this.orderModel.findByIdAndDelete(id).lean().exec();
  }

  aggregateTotalsByUser(userId: string) {
    return this.orderModel.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$user', totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]).exec();
  }
}
