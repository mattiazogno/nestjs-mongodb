import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validate } from './config/env.validation';
import { UsersModule } from './users/users.module'; // ← il tuo modulo
import { OrdersModule } from './orders/orders.module';
import { MiddlewareMiddleware } from './common/middleware/middleware/middleware.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigService accessibile ovunque senza import
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // fallback intelligente
      validate, // fail-fast se manca qualcosa o è invalido
      cache: true, // performance (da v3+)
      expandVariables: true, // supporta ${VAR} dentro .env (utile)
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGODB_URI'),
        // retry logic utile in container
        retryAttempts: 10,
        retryDelay: 3000,
        connectionFactory: (connection) => {
          console.log(`MongoDB connected to: ${connection.name}`);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    OrdersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
