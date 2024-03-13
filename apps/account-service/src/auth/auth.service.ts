import { ConflictException,  Injectable } from '@nestjs/common';
import { Prisma,  PrismaService } from '@tech-sharing/account-schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  // find all user
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async createUser(createUserDto: Prisma.UserCreateInput) {
    // check if user exist
    const isUserExist = await this.checkUser(createUserDto.email);
    if (isUserExist) throw new ConflictException('Email already exist');
    // create user
    const user = await this.prisma.user.create({
      data: createUserDto
    });
    return user;
  }

  async checkUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    return user;
  }
}
