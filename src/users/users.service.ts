import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/base.service';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorMessages } from 'src/infrastructure/enums/error-messages.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, phone } = createUserDto;
    const userUsernameExists = await this.findUserIfExist(username);
    if (userUsernameExists) {
      throw new BadRequestException(ErrorMessages.USERNAME_ALREADY_EXISTS);
    }

    if (email) {
      const userEmailExists = await this.findUserIfExist(email);
      if (userEmailExists) {
        throw new BadRequestException(ErrorMessages.EMAIL_ALREADY_EXISTS);
      }
    }

    if (phone) {
      const userPhoneExists = await this.findUserIfExist(phone);
      if (userPhoneExists) {
        throw new BadRequestException(ErrorMessages.PHONE_ALREADY_EXISTS);
      }
    }

    // if (!email && !phone) {
    //   throw new BadRequestException(ErrorMessages.EMAIL_OR_PHONE_EMPTY);
    // }

    const newUser = new User();
    newUser.absorbFromDto(createUserDto);

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  private async findUserIfExist(searchParam: string): Promise<User | null> {
    const userExists = await this.getBy(
      [
        {
          username: searchParam,
        },
        {
          email: searchParam,
        },
        {
          phone: searchParam,
        },
      ],
      {},
      false,
    );

    return userExists;
  }

  async updateProfile(userId: number, updateDto: UpdateUserDto) {
    const user = await this.getBy({ id: userId });
    user.absorbFromDto(updateDto);

    return this.userRepository.save(user);
  }
}
