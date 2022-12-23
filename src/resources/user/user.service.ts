import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bc from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    let { password } = createUserDto;
    const salt = bc.genSaltSync(10);
    password = bc.hashSync(password, salt);
    const newUser = new this.userModel({ ...createUserDto, password, salt });
    return newUser.save();
  }

  findAll() {
    return this.userModel
      .find({}, { role: 1, email: 1, registers: 1, active: 1 })
      .populate('registers', { user_id: 0 })
      .exec();
  }

  findOne(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  findOneUser(id: string) {
    return this.userModel
      .findById(id, { role: 1, email: 1, registers: 1, active: 1 })
      .populate('registers')
      .exec();
  }

  appendRegister(id: string, register: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { $push: { registers: register } },
      { new: true },
    );
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
