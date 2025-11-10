import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: SignupDto) {
        return await this.authService.signup(body);
    }

    @Post('signin')
    async signin(@Body() body: SigninDto) {
        return await this.authService.signin(body);
    }

    @Get('me')
    @UseGuards(AuthGuard)
    async me(@Request() request: any) {
        return request.user;
    }
}
