import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
// import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
// import { Role } from 'src/roles/roles.enum';
// import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from './entities/user.entity';
import { GetUser } from './user.decorator';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //* ========================================== CREATE USER ==========================================
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //* ========================================== Login ==========================================
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  //* ========================================== ME ==========================================
  // @Roles([Role.All])
  @UseGuards(RolesGuard)
  @Get('me')
  me(@GetUser() reqUser: User) {
    if (reqUser) {
      return 'You are logged in';
    }
    return 'You are not logged in';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id;
    // return this.usersService.findOne(+id);
  }
}
