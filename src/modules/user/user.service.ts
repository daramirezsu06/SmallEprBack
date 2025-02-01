import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreteRoleDto } from './dtos/creteRoleDto';
import { CreateUserDto } from './dtos/createUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(user: CreateUserDto) {
    const { roleId, ...userData } = user;
    const role = await this.roleRepository.findOneBy({ id: roleId });
    const newUser = this.userRepository.create(userData);
    newUser.role = role;
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  async createRole(createRoleDto: CreteRoleDto) {
    const newRole = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(newRole);
  }
}
