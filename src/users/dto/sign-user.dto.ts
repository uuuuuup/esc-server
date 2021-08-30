import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MyBaseOutput } from 'src/common/MyBase.dto';
import { Column } from 'typeorm';

@ObjectType()
export class Profile {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  picture: string;
}

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

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
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

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}
