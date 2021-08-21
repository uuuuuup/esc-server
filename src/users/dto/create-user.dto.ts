import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MyBaseOutput } from 'src/common/MyBase.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateUserOutput extends MyBaseOutput {}
