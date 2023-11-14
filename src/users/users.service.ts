import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id: Equal(id) });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  find(email: string) {
    return this.userRepository.findBy({ email });
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, attributes);
    
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
