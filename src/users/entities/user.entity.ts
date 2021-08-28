import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { MyBaseObject } from 'src/common/MyBase.entity';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User extends MyBaseObject {
  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
