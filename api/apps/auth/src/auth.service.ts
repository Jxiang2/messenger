import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/shared/prisma/prisma.service";
import { RegisterUserDto } from "@app/shared/dto";

@Injectable()
export class AuthService {
  constructor(readonly prismaService: PrismaService) {}

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async register(newUser: RegisterUserDto) {
    console.log("Hello world");
    return newUser;
  }
}
