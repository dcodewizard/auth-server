import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signUp(createUserDto: CreateUserDto): Promise<User | null> {
    try {
      const user = new this.userModel(createUserDto);
      return await user.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && 'email' in error.keyPattern) {
        throw new Error('Email is already in use.');
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto): Promise<User | null> {
    console.log('Received sign-in request with data:', signInDto);
    
    const user = await this.userModel.findOne({ email: signInDto.email }).exec();
  
    if (!user) {
      console.error('User not found for email:', signInDto.email);
      return null;
    }
  
    console.log('User found in the database:', user);
    
    const isPasswordValid = await user.comparePassword(signInDto.password);
  
    if (!isPasswordValid) {
      console.error('Password is incorrect for email:', signInDto.email);
      return null;
    }
  
    console.log('Sign-in successful for email:', signInDto.email);
    
    return user;
  }
  
}
