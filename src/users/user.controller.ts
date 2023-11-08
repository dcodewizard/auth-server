import { Controller, Post, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthMiddleware } from 'src/middleware/jwt-auth.middleware';
import { User } from './user.model';
import { CustomError } from 'src/Error/customHttpErrors';

@Controller('api/users')
@UseGuards(JwtAuthMiddleware)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{
    user: User;
    token: string;
  }> {
    if (!this.isPasswordValid(createUserDto.password)) {
      console.error('Password validation failed');
      throw new CustomError(
        'Password must be at least 8 characters long and include at least 1 letter, 1 number, and 1 special character.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user = await this.userService.signUp(createUserDto);

      const token = await this.authService.generateToken({ sub: user._id });

      if (!token) {
        console.error('Error generating JWT token');
        throw new CustomError(
          'Unable to authenticate',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      console.log('User registered and JWT token generated successfully');

      return { user, token };
    } catch (error) {
      console.error('Error during user registration:', error);
      throw new CustomError('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  private isPasswordValid(password: string): boolean {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<{
    user: User;
    token: string;
  }> {
    console.log('Received sign-in request with data:', signInDto);

    const user = await this.userService.signIn(signInDto);

    if (!user) {
      console.error('Incorrect email or password:', signInDto.email);
      throw new CustomError(
        'incorrect email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.generateToken({ sub: user._id });

    console.log('User signed in successfully:', user.email);

    return { user, token };
  }
}
