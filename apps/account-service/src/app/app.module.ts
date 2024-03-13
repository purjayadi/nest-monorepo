import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import {PrismaModule} from '@tech-sharing/account-schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import ExceptionFilter from '../common/exception-filter';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionFilter,
  }
  ]
})
export class AppModule {}
