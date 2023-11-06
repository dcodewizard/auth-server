import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
