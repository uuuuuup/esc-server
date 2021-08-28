import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  SignInInput,
  SignInOutput,
  SignUpInput,
  SignUpOutput,
} from './dto/sign-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => String)
  me(): string {
    return 'hello';
  }

  @Mutation(() => SignUpOutput)
  signUp(@Args('input') signUpInput: SignUpInput): Promise<SignUpOutput> {
    return this.userService.signUp(signUpInput);
  }

  @Mutation(() => SignInOutput)
  signIn(@Args('input') signInInput: SignInInput): Promise<SignInOutput> {
    return this.userService.signIn(signInInput);
  }
}
