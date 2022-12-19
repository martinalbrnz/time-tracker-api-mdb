import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  findAll() {
    return this.projectModel.find().exec();
  }

  findOne(id: string) {
    return this.projectModel.findById(id).exec();
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
