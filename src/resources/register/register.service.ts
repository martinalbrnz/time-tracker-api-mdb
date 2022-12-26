import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Project,
  // eslint-disable-next-line prettier/prettier
  ProjectDocument
} from '@resources/project/schemas/project.schema';
import { User, UserDocument } from '@resources/user/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateRegisterDto } from './dto/create-register.dto';
import { IndexRegisterDto } from './dto/index-register.dto';
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
    query: { init_date: Date; end_date: Date },
    index?: number,
    size?: number,
  ) {
    const { init_date, end_date } = query;
    return this.registerModel
      .find({
        init_date: {
          $gte: init_date ? new Date(init_date) : new Date(2000, 1, 1),
        },
        end_date: {
          $lte: end_date ? new Date(end_date) : new Date(2100, 1, 1),
        },
      })
      .skip((Number(index) - 1) * Number(size))
      .limit(size)
      .exec();
  }

  async findUserAll(query: IndexRegisterDto) {
    const data = await this.registerModel
      .find({
        user_id: { $eq: query.user },
        init_date: {
          $gte: query.init_date
            ? new Date(query.init_date)
            : new Date(2000, 1, 1),
        },
        end_date: {
          $lte: query.end_date
            ? new Date(new Date(query.end_date).getTime() + 86400000) // ms on a day
            : new Date(2100, 1, 1),
        },
      })
      .skip((Number(query.index) - 1) * Number(query.size))
      .limit(query.size)
      .sort({ init_date: 'desc' })
      .populate('user_id', { name: 1, email: 1 })
      .populate('project')
      .exec();

    const max = await this.registerModel.countDocuments();
    return { data, max };
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
