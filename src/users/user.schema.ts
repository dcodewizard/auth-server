import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password: string): boolean {
        return password.length >= 8;
      },
      message: 'Password must be at least 8 characters long',
    },
  },
});

UserSchema.pre('save', async function (next) {
  const user = this as User;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
