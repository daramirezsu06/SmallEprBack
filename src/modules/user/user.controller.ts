import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dtos/createUserDto';
import { CreteRoleDto } from './dtos/creteRoleDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('role')
  createRole(@Body() createRoleDto: CreteRoleDto) {
    return this.userService.createRole(createRoleDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
