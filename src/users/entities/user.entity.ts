import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { MyBaseObject } from 'src/common/MyBase.entity';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType')
@ObjectType()
@Entity()
export class User extends MyBaseObject {
  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
