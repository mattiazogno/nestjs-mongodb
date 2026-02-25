import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,           // best practice per query frequenti
  })
  user!: MongooseSchema.Types.ObjectId; // è lo user_id, id dell'utente

  @Prop({ required: true, type: Number, min: 0 })
  amount!: number;

  @Prop({
    type: String,
    enum: ['pending', 'paid', 'shipped', 'cancelled'],
    default: 'pending',
    index: true,
  })
  status!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);