import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // eslint-disable-next-line prettier/prettier
  Query
} from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { IndexRegisterDto } from './dto/index-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }

  @Get()
  findUserAll(@Query() query: IndexRegisterDto) {
    return this.registerService.findUserAll(
      query.user,
      query.index,
      query.size,
    );
  }

  @Get('all')
  findAll(@Param() query: IndexRegisterDto) {
    const { start_date, end_date } = query;
    return this.registerService.findAll(
      { start_date, end_date },
      query.index,
      query.size,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegisterDto: UpdateRegisterDto,
  ) {
    return this.registerService.update(id, updateRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerService.remove(id);
  }
}
