import {
  Controller,
  Post,
  Body,
  HttpCode,
  Put,
  UseGuards,
  Req,
  UnauthorizedException,
  Get,
  Injectable,
  Scope,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../guards/auth.guard";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { RegisterUserDto } from "src/dto/register-user.dto";
import { LoginUserDto } from "src/dto/login-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { RefreshDto } from "src/dto/refresh.dto";

@ApiTags("Auth")
@Injectable({ scope: Scope.REQUEST })
@Controller("api/user")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: 200,
    description: "Successfully registered",
    schema: {
      example: {
        _id: "67c4d524275bc5d350c95172",
        name: "Dmytro",
        email: "dmytro@gmail.com",
        phone: "++380123231231",
        createdAt: "2025-03-02T22:01:08.711Z",
        updatedAt: "2025-03-02T22:01:08.711Z",
      },
    },
  })
  @ApiResponse({ status: 404, description: "Service not found" })
  @ApiResponse({ status: 409, description: "Email is already in use" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return {
      status: 200,
      data: await this.authService.registerUser(registerUserDto),
      message: "Successfully registered",
    };
  }

  @Post("login")
  @HttpCode(200)
  @ApiOperation({ summary: "Login user" })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: "Successfully logged in",
    schema: {
      example: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFvenlyc2t5aUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2N2MxZDgzZjQ5MTcxNmIwZmJlOWI3Y2IiLCJpYXQiOjE3NDA5NTI4MDIsImV4cCI6MTc0MDk1MzcwMn0.PmYOmdWrkjlKm6u7yH3XhKS2V84hlAS1Fk97pvA1Xzw",
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFvenlyc2t5aUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2N2MxZDgzZjQ5MTcxNmIwZmJlOWI3Y2IiLCJpYXQiOjE3NDA5NTI4MDIsImV4cCI6MTc0MzU0NDgwMn0.as2dy_SW3xXqcBzptRJLJdy7AYaj2Cc-tOmyl7OMeqs",
        user: {
          _id: "67c1d83f491716b0fbe9b7cb",
          name: "Alex",
          phone: "+380638483354",
          email: "aozyrskyi@gmail.com",
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Your email or password is incorrect",
  })
  @ApiResponse({ status: 404, description: "Service not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async login(@Body() loginUserDto: LoginUserDto) {
    return {
      status: 200,
      data: await this.authService.loginUser(loginUserDto),
      message: "Successfully logged in",
    };
  }

  @Post("refresh")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Refresh access token using refresh token" })
  @ApiBody({ type: RefreshDto })
  @ApiResponse({
    status: 201,
    description: "Successfully refreshed tokens",
    schema: {
      example: {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWF0IjoxNzQwOTU1OTUwLCJleHAiOjE3NDA5NTY4NTB9.FgrkdCJ8knaFIdFzGy-ZdIwb5X-EsIJPFOqSMtrxUy8",
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWF0IjoxNzQwOTU1OTUwLCJleHAiOjE3NDM1NDc5NTB9._LO3lfIFS_K4_Nrk33rjGcD8AZ5zveJeGX4kupxNDKU",
      },
    },
  })
  @ApiResponse({ status: 401, description: "Invalid refresh token" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async refresh(@Body("refreshToken") refreshToken: string) {
    return {
      status: 200,
      data: await this.authService.refreshToken(refreshToken),
      message: "Successfully refreshed tokens",
    };
  }

  @Put("update")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user information" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: "Successfully updated user",
    schema: {
      example: {
        _id: "67c4d524275bc5d350c95172",
        name: "Alex",
        email: "alex@gmail.com",
        phone: "+380731604175",
        createdAt: "2025-03-02T22:01:08.711Z",
        updatedAt: "2025-03-02T22:58:29.117Z",
      },
    },
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async updateUserInfo(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    const userId = req.user?.userId;

    if (!userId) throw new UnauthorizedException("User not authenticated");

    return {
      status: 200,
      data: await this.authService.updateUser(updateUserDto, req),
      message: "Successfully updated user",
    };
  }

  @Get("user-info")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user data" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved user data",
    schema: {
      example: {
        _id: "67c4d524275bc5d350c95172",
        name: "Alex",
        email: "alex@gmail.com",
        phone: "+380731604175",
        createdAt: "2025-03-02T22:01:08.711Z",
        updatedAt: "2025-03-02T22:58:29.117Z",
      },
    },
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getUserInfo(@Req() req: any) {
    return {
      status: 200,
      data: await this.authService.getUserData(req.user.userId),
      message: "Successfully retrieved user data",
    };
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: "Logout user" })
  @ApiResponse({ status: 204, description: "Successfully logged out" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async logout() {
    await this.authService.logoutUser();
    return { status: 204, message: "Successfully logged out" };
  }
}
