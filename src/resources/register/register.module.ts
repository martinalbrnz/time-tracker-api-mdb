import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { Register, RegisterSchema } from './schemas/register.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [
    RegisterService,
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
    ]),
  ],
})
export class RegisterModule {}
