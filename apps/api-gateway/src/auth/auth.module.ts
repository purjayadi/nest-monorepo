import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: 'ACCOUNT_SERVICES',
      useFactory: () => {
        const user = process.env.RABBITMQ_USER;
        const password = process.env.RABBITMQ_PASSWORD;
        const host = process.env.RABBITMQ_HOST;
        const queueName = process.env.RABBITMQ_QUEUE_NAME;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: true
            }
          }
        });
      }
    }
  ]
})
export class AuthModule {}
