import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { MyBaseOutput } from 'src/common/MyBase.dto';
import { User } from '../entities/user.entity';

@InputType()
export class FindUserInput {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class FindUserOutput extends MyBaseOutput {
  @Field(() => User, { nullable: true })
  result?: User;
}

@ObjectType()
export class FindUsersOutput extends MyBaseOutput {
  @Field(() => [User], { nullable: true })
  result?: User[];
}
