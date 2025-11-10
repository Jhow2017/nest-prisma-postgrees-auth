import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth.dto';
import { UserValidation } from 'src/common/validations/user.validation';

@Injectable()
export class AuthService {
    constructor(private userValidation: UserValidation) { }

    async signup(data: SignupDto) {
        await this.userValidation.checkEmailExists(data.email);
        return data;
    }

    async signin(data: SigninDto) {
        console.log('data', data);
        return data;
    }
}
