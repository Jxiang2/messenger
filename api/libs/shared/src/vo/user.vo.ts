import { Exclude } from "class-transformer";
import { User } from "@prisma/client";

export class RegisterUserVo implements User {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  @Exclude()
  password: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
  }
}
