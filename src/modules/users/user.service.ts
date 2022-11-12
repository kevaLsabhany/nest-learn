import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async getByEmail(email: string) {
    const user = this.usersRepository.findOne({
      where: {
        email
      }
    });
    if(user) return user;
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
  }

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}