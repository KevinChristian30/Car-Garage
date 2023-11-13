import { Injectable } from '@nestjs/common';
import { UserCreateRequestDTO } from './user.dto';
import { User } from './user.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(dto: UserCreateRequestDTO) {
    const user = this.userRepository.create(dto);
    this.userRepository.save(user);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id: Equal(id) });
  }

  find(email: string) {
    return this.userRepository.findBy({ email });
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User Not Found');
    }

    Object.assign(user, attributes);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User Not Found');
    }

    return this.userRepository.remove(user);
  }
}
