import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSettings, UserSettingsSchema } from './user-settings.schema';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
