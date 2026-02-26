import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrdersController } from './controllers/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersRepository } from './repositories/orders.repository';
import { Order, OrderSchema } from '../schemas/order.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrderService, OrdersRepository],
})
export class OrdersModule {}
