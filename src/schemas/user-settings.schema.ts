import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class UserSettings {
@Prop({ type: Boolean, default: false })
  receivedNotification?: boolean;

  @Prop({ type: Boolean, default: false })
  receivedEmail?: boolean;

  @Prop({ type: Boolean, default: false })
  receivedSMS?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
