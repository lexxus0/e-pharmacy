import {
  Controller,
  Post,
  Body,
  HttpCode,
  Put,
  UseGuards,
  Req,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './auth.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('api/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    const userId = req.user?.userId;

    if (!userId) throw new UnauthorizedException('User not authenticated');

    return this.authService.updateUser(updateUserDto, req);
  }

  @Get('user-info')
  @UseGuards(JwtAuthGuard)
  async getUserData(@Req() req: any) {
    return this.authService.getUserData(req.user.userId);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async logout() {
    return this.authService.logoutUser();
  }
}
