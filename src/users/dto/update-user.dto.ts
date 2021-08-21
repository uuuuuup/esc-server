import { CreateUserInput } from './create-user.dto';
import {
  InputType,
  Field,
  Int,
  PartialType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { MyBaseOutput } from 'src/common/MyBase.dto';

@InputType()
export class UpdateUserInput extends PartialType(
  PickType(CreateUserInput, ['password']),
) {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class UpdateUserOutput extends MyBaseOutput {}
