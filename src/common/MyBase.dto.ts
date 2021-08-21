import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class MyBaseInput {}

@ObjectType()
export class MyBaseOutput {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;
}
