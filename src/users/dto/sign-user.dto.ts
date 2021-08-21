import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MyBaseOutput } from 'src/common/MyBase.dto';
import { User } from '../entities/user.entity';

@InputType()
export class SignInInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class SignInOutput extends MyBaseOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
