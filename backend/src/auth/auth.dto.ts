import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  MaxLength,
  Matches,
  isPhoneNumber,
} from 'class-validator';
import { IsValidPhoneNumber } from 'src/decorators/phone.decorator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(/^[^@]+@[^@]+\.[^@]+$/, {
    message:
      'Email must contain exactly one "@" and at least one dot in the domain part.',
  })
  readonly email: string;

  @IsValidPhoneNumber({ message: 'Please provide a valid phone number.' })
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @IsNotEmpty()
  readonly password: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^[^@]+@[^@]+\.[^@]+$/, {
    message:
      'Email must contain exactly one "@" and at least one dot in the domain part.',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  readonly password: string;
}
