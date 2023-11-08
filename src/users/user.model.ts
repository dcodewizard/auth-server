import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  sub: string;
  email: string;
  name: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
