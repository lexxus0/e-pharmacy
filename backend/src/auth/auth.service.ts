import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto, LoginUserDto } from "./auth.dto";
import * as bcrypt from "bcrypt";
import { IJwtPayload } from "src/interfaces/jwt-payload.interface";
import { UsersService } from "src/users/users.service";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { validateEnvVariable } from "src/utils/env.util";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Validate access token
   * @param token JWT token
   * @returns decoded payload or null if invalid
   */
  validateAccessToken(token: string): IJwtPayload | null {
    try {
      return this.jwtService.verify(token, {
        secret: validateEnvVariable(
          process.env.JWT_ACCESS_SECRET,
          "JWT_ACCESS_SECRET"
        ),
      }) as IJwtPayload;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * Register a new user
   * @param registerUserDto registration details
   * @returns user data excluding password
   */
  async registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, phone, password } = registerUserDto;
    const isUser = await this.usersService.findByEmail(email);
    if (isUser) throw new ConflictException("Email is already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const userData = { ...newUser.toObject() };
    delete userData.password;
    return userData;
  }

  /**
   * Login a user and return tokens
   * @param loginUserDto login credentials
   * @returns access and refresh tokens
   */
  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException("User not found");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException("Your email or password is incorrect");

    const tokens = this.generateTokens(user);

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    };
  }

  /**
   * Get user data by userId
   * @param userId user identifier
   * @returns user data
   */
  async getUserData(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const { password, ...userData } = user.toObject();
    return userData;
  }

  /**
   * Update user data
   * @param updateUserDto new user data
   * @param req request object containing user info
   * @returns updated user data
   */
  async updateUser(updateUserDto: UpdateUserDto, req: any) {
    const userId = req.user.userId;

    if (!userId) {
      throw new UnauthorizedException("User not authenticated");
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.usersService.update(userId, updateUserDto);

    if (!updatedUser) {
      throw new UnauthorizedException("Unable to update user details");
    }

    const { password, ...user } = updatedUser.toObject();
    return user;
  }

  /**
   * Refresh access token
   * @param oldRefreshToken existing refresh token
   * @returns new access and refresh tokens
   */
  async refreshToken(oldRefreshToken: string) {
    try {
      const decoded = this.jwtService.verify(oldRefreshToken, {
        secret: validateEnvVariable(
          process.env.JWT_REFRESH_SECRET,
          "JWT_REFRESH_SECRET"
        ),
      });

      const user = await this.usersService.findById(decoded.userId);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      const { accessToken, refreshToken } = this.generateTokens(user);
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }

  private generateTokens(user: any) {
    const jwtPayload: IJwtPayload = {
      email: user.email,
      userId: user._id,
    };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: validateEnvVariable(
        process.env.JWT_ACCESS_SECRET,
        "JWT_ACCESS_SECRET"
      ),
      expiresIn: "15m",
    });

    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: validateEnvVariable(
        process.env.JWT_REFRESH_SECRET,
        "JWT_REFRESH_SECRET"
      ),
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  /**
   * Logout user
   * @returns success message
   */
  logoutUser() {
    return { message: "Successfully logged out" };
  }
}
