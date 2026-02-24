import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSettings } from './user-settings.schema';

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
  @Prop({ type: UserSettings, default: () => ({}) }) // oppure new UserSettings()
  settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
