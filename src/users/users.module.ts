import { Module } from '@nestjs/common';
import { UsersService as UsersService } from './users.service';
import { UsersResolver as UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
