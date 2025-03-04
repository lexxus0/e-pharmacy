import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("E-Pharmacy")
    .setDescription("API documentation for E-Pharmacy service")
    .addServer("https://e-pharmacy-c3fr.onrender.com")
    .addBearerAuth()
    .setVersion("1.0")
    .build();

  const PORT = process.env.PORT ?? 8080;

  app.use(cookieParser());

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}

bootstrap();
