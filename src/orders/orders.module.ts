import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrdersController } from './controllers/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrderService],
})
export class OrdersModule {}
