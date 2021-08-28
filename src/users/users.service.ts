import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

import { User, UserRole } from './entities/user.entity';
import {
  SignInInput,
  SignInOutput,
  SignUpInput,
  SignUpOutput,
} from './dto/sign-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<SignUpOutput> {
    try {
      const { accessToken } = signUpInput;
      const {
        data: { name, email, picture },
      } = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' +
          accessToken,
      );
      const user = await this.userRepository.findOne({ email });
      if (user) {
        return { ok: false, error: 'user already exist' };
      }

      const newUser = await this.userRepository.save(
        this.userRepository.create({ email, role: UserRole.User }),
      );
      const token = await jwt.sign(
        { id: newUser.id, role: newUser.role },
        this.configService.get('PRIVATE_KEY'),
      );
      return { ok: true, token, profile: { name, email, picture } };
    } catch (error) {
      return { ok: false, error: 'error occurred' };
    }
  }

  async signIn(signInInput: SignInInput): Promise<SignInOutput> {
    try {
      const { accessToken } = signInInput;
      const {
        data: { name, email, picture },
      } = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' +
          accessToken,
      );
      const user = await this.userRepository.findOne({ email });
      if (!user) {
        return { ok: false, error: 'no user exist' };
      }

      const token = await jwt.sign(
        { id: user.id, role: user.role },
        this.configService.get('PRIVATE_KEY'),
      );
      return { ok: true, token, profile: { name, email, picture } };
    } catch (error) {
      return { ok: false, error: 'error occurred' };
    }
  }
}
