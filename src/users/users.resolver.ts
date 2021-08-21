import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.dto';
import {
  FindUserInput,
  FindUserOutput,
  FindUsersOutput,
} from './dto/find-user.dto';
import { SignInInput, SignInOutput } from './dto/sign-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => FindUserOutput, { name: 'user' })
  findOne(
    @Args('input', { type: () => FindUserInput }) id: FindUserInput,
  ): Promise<FindUserOutput> {
    return this.userService.findOne(id);
  }

  @Query(() => FindUsersOutput, { name: 'users' })
  findAll(): Promise<FindUsersOutput> {
    return this.userService.findAll();
  }

  @Mutation(() => CreateUserOutput)
  createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => UpdateUserOutput)
  updateUser(
    @Args('input') updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => SignInOutput)
  signIn(@Args('input') signInInput: SignInInput): Promise<SignInOutput> {
    return this.userService.signIn(signInInput);
  }
}
