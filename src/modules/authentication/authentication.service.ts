import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { RegistrationDto } from "./dto/registration.dto";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly usersService: UserService
  ) {}

  async register(registrationData: RegistrationDto) {
    const user = await this.usersService.getByEmail(registrationData.email);
    if(user) throw new HttpException("User already exists.", HttpStatus.BAD_REQUEST);
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword
    });
    createdUser.password = undefined;
    return createdUser;
  }

  async login(loginData: LoginDto) {
    const user = await this.usersService.getByEmail(loginData.email);
    if(!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    if(this.verifyPassword(loginData.password, user.password)) {
      user.password = undefined;
      return user;
    } else {
      throw new HttpException('Wrong credentials.', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}