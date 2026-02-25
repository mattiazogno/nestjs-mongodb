import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// One to Many embedded
@Schema({ timestamps: true, _id: false }) 
export class Post {
  @Prop({ required: false, trim: true, maxlength: 200 })
  title!: string;

  @Prop({ required: false, maxlength: 10000 })
  content!: string;
}

export const PostSchema = SchemaFactory.createForClass(Post).set('timestamps', true);