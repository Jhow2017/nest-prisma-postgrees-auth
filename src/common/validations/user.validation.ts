import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserValidation {
    constructor(private prisma: PrismaService) { }

    async checkEmailExists(email: string): Promise<void> {
        const userAlreadyExists = await this.prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (userAlreadyExists) {
            throw new UnauthorizedException('User already exists');
        }
    }
}

