export interface SignupDto {
    email: string;
    password: string;
}

export interface SigninDto extends SignupDto {
    name: string;
}