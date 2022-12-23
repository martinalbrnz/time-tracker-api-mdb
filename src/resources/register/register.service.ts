import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Project,
  ProjectDocument
} from '@resources/project/schemas/project.schema';
import { User, UserDocument } from '@resources/user/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Register, RegisterDocument } from './schemas/register.schema';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<RegisterDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  create(createRegisterDto: CreateRegisterDto) {
    const register = new this.registerModel(createRegisterDto);
    this.appendRegisterToUser(
      register.user_id.toString(),
      register._id.toString(),
    );
    this.appendRegisterToProject(
      register.project.toString(),
      register._id.toString(),
    );
    return register.save();
  }

  findAll(
    query: { start_date: Date; end_date: Date },
    index?: number,
    size?: number,
  ) {
    const { start_date, end_date } = query;
    return this.registerModel
      .find({
        start_date: {
          $gte: start_date ? new Date(start_date) : new Date(2000, 1, 1),
        },
        end_date: {
          $lte: end_date ? new Date(end_date) : new Date(2100, 1, 1),
        },
      })
      .skip((Number(index) - 1) * Number(size))
      .limit(size)
      .exec();
  }

  findUserAll(id?: string, index?: number, size?: number) {
    return this.registerModel
      .find({ user_id: { $eq: id } })
      .skip((Number(index) - 1) * Number(size))
      .limit(size)
      .populate('user_id', { name: 1, email: 1 })
      .populate('project')
      .exec();
  }

  findOne(id: string) {
    return this.registerModel.findById(id).exec();
  }

  countDocuments(id?: string) {
    return this.registerModel.countDocuments({ _id: id }).exec();
  }

  appendRegisterToUser(id: string, register: string) {
    return this.userModel
      .findByIdAndUpdate(id, { $push: { registers: register } }, { new: true })
      .exec();
  }

  appendRegisterToProject(id: string, register: string) {
    return this.projectModel
      .findByIdAndUpdate(id, { $push: { registers: register } }, { new: true })
      .exec();
  }

  update(id: string, updateRegisterDto: UpdateRegisterDto) {
    return this.registerModel.findByIdAndUpdate(id, updateRegisterDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.registerModel.findByIdAndDelete(id);
  }
}
