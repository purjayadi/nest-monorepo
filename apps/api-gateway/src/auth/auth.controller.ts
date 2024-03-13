import { CreateAccountDto } from '@tech-sharing/shared';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('ACCOUNT_SERVICES') private readonly client: ClientProxy
  ) {}

  // find all user
  @Get()
  async findAll() {
    return await firstValueFrom(this.client.send('AUTH.FIND.ALL', {}));
  }

  @Post('signup')
  async signup(@Body() payload: CreateAccountDto) {
    return await firstValueFrom(this.client.send('auth.signup', payload));
  }
}
