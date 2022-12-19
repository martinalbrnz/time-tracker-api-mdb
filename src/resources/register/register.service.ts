import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Register, RegisterDocument } from './schemas/register.schema';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<RegisterDocument>,
  ) {}

  create(createRegisterDto: CreateRegisterDto) {
    const register = new this.registerModel(createRegisterDto);
    return register.save();
  }

  findAll(
    query: { start_date: Date; end_date: Date },
    index?: number,
    size?: number,
  ) {
    return this.registerModel
      .find(query)
      .skip((Number(index) - 1) * Number(size))
      .limit(size)
      .exec();
  }

  findUserAll(id?: string, index?: number, size?: number) {
    return this.registerModel
      .find({ user_id: id })
      .skip((Number(index) - 1) * Number(size))
      .limit(size)
      .exec();
  }

  findOne(id: string) {
    return this.registerModel.findById(id).exec();
  }

  countDocuments(id?: string) {
    return this.registerModel.countDocuments({ _id: id }).exec();
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
