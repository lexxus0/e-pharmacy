import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsValidPhoneNumber } from 'src/decorators/phone.decorator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(32)
  readonly name?: string;

  @IsValidPhoneNumber({ message: 'Please provide a valid phone number.' })
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @Matches(/^[^@]+@[^@]+\.[^@]+$/, {
    message:
      'Email must contain exactly one "@" and at least one dot in the domain part.',
  })
  readonly email?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(64)
  password?: string;
}
