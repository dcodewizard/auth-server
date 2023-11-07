import { Controller, Post, Body, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthMiddleware } from 'src/middleware/jwt-auth.middleware';

@Controller('api/users')
@UseGuards(JwtAuthMiddleware)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    if (!this.isPasswordValid(createUserDto.password)) {
      console.error('Password validation failed');
      throw new HttpException('Password validation failed', HttpStatus.BAD_REQUEST);
    }

    try {
      const user = await this.userService.signUp(createUserDto);

      const token = await this.authService.generateToken({ sub: user._id });

      if (!token) {
        console.error('Error generating JWT token');
        throw new HttpException('User registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      console.log('User registered and JWT token generated successfully');

      return { user, token };
    } catch (error) {
      console.error('Error during user registration:', error);
      throw new HttpException('User registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  private isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    console.log('Received sign-in request with data:', signInDto);

    const user = await this.userService.signIn(signInDto);

    if (!user) {
      console.error('User not found for email:', signInDto.email);
      throw new HttpException('Sign-in failed', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.generateToken({ sub: user._id });

    console.log('User signed in successfully:', user.email);

    return { user, token };
  }
}
