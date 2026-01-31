import { IsEmail, IsString } from 'class-validator';


export class UserPostDto {
      @IsString()
      username!: string;

      @IsString()
      password!: string;

      @IsEmail()
      email!: string;
}