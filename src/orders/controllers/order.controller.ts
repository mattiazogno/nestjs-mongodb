import { Body, Controller, Delete, Get, Param, Patch, Post, NotFoundException, Query } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import mongoose from 'mongoose';
import { OrderService } from '../services/order.service';
import { CursorPaginationDto } from 'src/common/dto/cursor-pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() pagination: CursorPaginationDto) {
    return this.ordersService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const order = await this.ordersService.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // Bonus: GET /orders/user/:userId
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.ordersService.findByUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}