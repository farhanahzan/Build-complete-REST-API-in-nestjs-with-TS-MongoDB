import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto):Promise<{token:string}> {
    return this.authServise.signUp(signUpDto)
  }

  @Get('login')
  login(@Body() loginDto:LoginDto):Promise<{token:string}>{
    return this.authServise.login(loginDto)

  }
}
