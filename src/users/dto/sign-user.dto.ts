import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MyBaseOutput } from 'src/common/MyBase.dto';
import { Column } from 'typeorm';
import { User } from '../entities/user.entity';

@InputType()
export class SignUpInput {
  @Field(() => String)
  @Column()
  accessToken: string;
}

@ObjectType()
export class SignUpOutput extends MyBaseOutput {
  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class SignInInput {
  @Field(() => String)
  accessToken: string;
}

@ObjectType()
export class SignInOutput extends MyBaseOutput {
  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
