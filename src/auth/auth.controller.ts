import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: SignupDto) {
        const user = await this.authService.signup(body);
        return user;
    }

    @Post('signin')
    async signin(@Body() body: SigninDto) {
        const user = await this.authService.signin(body);
        return user;
    }
}
