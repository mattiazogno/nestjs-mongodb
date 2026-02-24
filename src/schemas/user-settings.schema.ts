import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false }) // ← importantissimo: evita di creare _id inutili
export class UserSettings {
  @Prop({ required: false })
  receivedNotification?: boolean;

  @Prop({ required: false })
  receivedEmail?: boolean;

  @Prop({ required: false })
  receivedSMS?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
