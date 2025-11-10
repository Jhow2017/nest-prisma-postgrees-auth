import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {
    @IsString({ message: 'nome é obrigatório' })
    @IsNotEmpty({ message: 'nome é obrigatório' })
    name: string;

    @IsEmail({}, { message: 'email inválido' })
    @IsNotEmpty({ message: 'email é obrigatório' })
    email: string;

    @IsNotEmpty({ message: 'senha é obrigatório' })
    @IsString({ message: 'senha é obrigatório' })
    password: string;
}

export class SigninDto {
    @IsEmail({}, { message: 'email inválido' })
    @IsNotEmpty({ message: 'email é obrigatório' })
    email: string;

    @IsNotEmpty({ message: 'senha é obrigatório' })
    @IsString({ message: 'senha é obrigatório' })
    password: string;
}