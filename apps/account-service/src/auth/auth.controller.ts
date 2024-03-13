import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from '@tech-sharing/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
@ApiTags()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // find all user
  @MessagePattern('AUTH.FIND.ALL')
  findAll() {
    return this.authService.findAll();
  }

  @MessagePattern('auth.signups')
  signup(@Payload() payload: CreateAccountDto) {
    return this.authService.createUser(payload);
  }
}
