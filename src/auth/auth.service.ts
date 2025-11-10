import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth.dto';
import { UserValidation } from 'src/common/validations/user.validation';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userValidation: UserValidation,
        private PrismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    async signup(data: SignupDto) {
        await this.userValidation.findUserByEmail(data.email, {
            throwIfExists: true,
        });

        const hashedPassword = await this.userValidation.hashedPassword(data.password);
        const user = await this.PrismaService.user.create({
            data: {
                ...data,
                password: hashedPassword,
            }

        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }

    async signin(data: SigninDto) {
        const user = await this.userValidation.findUserByEmail(data.email, {
            throwIfNotExists: true,
        });

        if (!user) {
            throw new Error('User not found');
        }

        await this.userValidation.comparePassword(data.password, user.password);

        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email,
        });

        return { accessToken };
    }
}
