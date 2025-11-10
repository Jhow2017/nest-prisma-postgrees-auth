import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
    async signup(body: SignupDto) {
        console.log('body', body);
        return body;
    }

    async signin(body: SigninDto) {
        console.log('body', body);
        return body;
    }
}
