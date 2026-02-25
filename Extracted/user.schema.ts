import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSettings, UserSettingsSchema } from './user-settings.embed.schema';
import { Post, PostSchema } from './post.embed.schema';

// collection principale
@Schema({ timestamps: true })
export class User {
  // unique index
  @Prop({ unique: true, required: true })
  username!: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ required: false })
  avatarUrl?: string;

  // One to One
  @Prop({ type: UserSettingsSchema, default: () => ({}) })
  settings?: UserSettings;

  // One to Many
  @Prop({ type: [PostSchema], default: [] })
  post?: Post[];
}


export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('orders', {
  ref: 'Order',           // nome del model (NON il file)
  localField: '_id',
  foreignField: 'user',
});

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });