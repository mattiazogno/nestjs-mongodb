import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// One to One
@Schema({ timestamps: true, _id: false })
export class UserSettings {
  
  @Prop({ type: Boolean, default: false })
  receivedNotification?: boolean;

  @Prop({ type: Boolean, default: false })
  receivedEmail?: boolean;

  @Prop({ type: Boolean, default: false })
  receivedSMS?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
