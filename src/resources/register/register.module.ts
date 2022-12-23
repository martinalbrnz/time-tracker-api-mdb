import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectService } from '@resources/project/project.service';
import {
  Project,
  ProjectSchema
} from '@resources/project/schemas/project.schema';
import { User, UserSchema } from '@resources/user/schemas/user.schema';
import { UserService } from '@resources/user/user.service';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { Register, RegisterSchema } from './schemas/register.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService, UserService, ProjectService],
  exports: [
    RegisterService,
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
})
export class RegisterModule {}
