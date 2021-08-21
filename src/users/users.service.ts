import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import {
  FindUserInput,
  FindUserOutput,
  FindUsersOutput,
} from './dto/find-user.dto';
import { SignInInput, SignInOutput } from './dto/sign-user.dto';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const { email, password, role } = createUserInput;
      const hash = await bcrypt.hash(password, 10);
      await this.userRepository.save(
        this.userRepository.create({ email, password: hash, role }),
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'could not create' };
    }
  }

  async findAll(): Promise<FindUsersOutput> {
    try {
      const users = await this.userRepository.find();
      users.forEach((u) => (u.password = '********'));
      return {
        ok: true,
        result: users,
      };
    } catch (error) {
      return { ok: false, error: 'error occurred' };
    }
  }

  async findOne(findUserInput: FindUserInput): Promise<FindUserOutput> {
    try {
      const user = await this.userRepository.findOne(findUserInput.id);
      if (!user) {
        return { ok: false, error: 'no user found' };
      }
      user.password = '********';
      return {
        ok: true,
        result: user,
      };
    } catch (error) {
      return { ok: false, error: 'error occurred' };
    }
  }

  async update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    try {
      const { password } = updateUserInput;
      const user = await this.userRepository.findOne(id);
      if (!user) {
        return { ok: false, error: 'no user found' };
      }
      if (password) {
        const hash = await bcrypt.hash(password, 10);
        user.password = hash;
      }
      await this.userRepository.save(user);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'error occurred' };
    }
  }

  async signIn(signInInput: SignInInput): Promise<SignInOutput> {
    try {
      const { email, password } = signInInput;
      const user = await this.userRepository.findOne({ email });
      if (!user) {
        return { ok: false, error: 'no user found' };
      }
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        return { ok: false, error: 'wrong password' };
      }
      const token = await jwt.sign(
        { id: user.id, role: user.role },
        this.configService.get('PRIVATE_KEY'),
      );
      return { ok: true, token };
    } catch (error) {
      return { ok: false, error: 'error occurred' };
    }
  }
}
