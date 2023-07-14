import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserData, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserData.name)
    private model: Model<UserDocument>
  ) {}

  async create(dto: UserDto) {
    const checkUser = await this.findByUsername(dto.username);
    if (checkUser) {
      throw new BadRequestException('user has already');
    }
    return this.model.create({
      ...dto,
      password: bcrypt.hashSync(dto.password),
    });
  }

  list() {
    return this.model.find();
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  findByUsername(username: string) {
    return this.model.findOne({ username: username });
  }
}
