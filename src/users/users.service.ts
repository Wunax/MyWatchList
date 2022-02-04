import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByCredentials(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async createUser(email: string, password: string): Promise<UserDocument> {
    const hash = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hash });
    return user.save();
  }
}
