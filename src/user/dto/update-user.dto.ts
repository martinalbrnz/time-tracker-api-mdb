import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  password?: string;
  name?: string;
  active?: boolean;
  registers?: string[];
  register?: string;
}
