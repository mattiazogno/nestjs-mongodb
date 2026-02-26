import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll() {
    return this.userModel.find().populate('orders');
  }

  findById(id: string) {
    return this.userModel.findById(id).populate('orders');
  }

  create(dto: any) {
    const doc = new this.userModel(dto);
    return doc.save();
  }

  update(id: string, dto: any) {
    return this.userModel.findByIdAndUpdate(id, dto, { returnDocument: 'after' });
  }

  updateSettings(userId: string, settingsDto: any) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $set: { settings: settingsDto } },
      { returnDocument: 'after', runValidators: true },
    );
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  // Custom: find by username (example of simple custom query)
  findByUsername(username: string) {
    return this.userModel.findOne({ username }).populate('orders');
  }

  // Custom: return user with orders count using aggregation
  async getWithOrdersCount(userId: string) {
    const pipeline = [
      { $match: { _id: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'user',
          as: 'orders',
        },
      },
      { $addFields: { ordersCount: { $size: '$orders' } } },
      { $project: { orders: 0 } },
    ];

    const res = await this.userModel.aggregate(pipeline).exec();
    return res[0] ?? null;
  }
}
