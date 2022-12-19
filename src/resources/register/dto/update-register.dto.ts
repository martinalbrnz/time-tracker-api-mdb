import { PartialType } from '@nestjs/mapped-types';
import { CreateRegisterDto } from './create-register.dto';

export class UpdateRegisterDto extends PartialType(CreateRegisterDto) {
  init_date: Date;
  end_date: Date;
  hours: number;
  project: string;
}
