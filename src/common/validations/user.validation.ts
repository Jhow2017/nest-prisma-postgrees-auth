import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserValidation {
    constructor(private prisma: PrismaService) { }

    async findUserByEmail(
        email: string,
        options: {
            throwIfExists?: boolean;
            throwIfNotExists?: boolean;
            existsMessage?: string;
            notExistsMessage?: string;
        } = {},
    ): Promise<User | null> {
        const {
            throwIfExists = false,
            throwIfNotExists = false,
            existsMessage = 'User already exists',
            notExistsMessage = 'Invalid credentials',
        } = options;

        const user = await this.prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (throwIfExists && user) {
            throw new UnauthorizedException(existsMessage);
        }

        if (throwIfNotExists && !user) {
            throw new UnauthorizedException(notExistsMessage);
        }

        // Se throwIfNotExists é true e chegou aqui, user não é null
        if (throwIfNotExists) {
            return user as User;
        }

        return user;
    }

    async hashedPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    async comparePassword(password: string, userPassword: string): Promise<void> {
        const passwordMatch = await bcrypt.compare(password, userPassword);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}

