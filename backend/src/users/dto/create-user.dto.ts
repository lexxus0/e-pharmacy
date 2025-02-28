import { IsString, IsEmail, MinLength } from 'class-validator';
import { IsValidPhoneNumber } from 'src/decorators/phone.decorator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsValidPhoneNumber({ message: 'Please provide a valid phone number.' })
  readonly phone: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
