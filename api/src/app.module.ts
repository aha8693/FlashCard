import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { validate } from "./env.validation";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth/auth.service";
import { LocalStrategy } from "./auth/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { User } from "./user/user.entity";
import { UserService } from "./user/user.service";
import { UserController } from "./user/user.controller";
import { JwtModule } from "@nestjs/jwt";
import { DecksModule } from "./decks/decks.module";
import { JwtStrategy } from "./auth/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate, // utilize this validation schema during its initialization
    }), // Loads the .env file
    TypeOrmModule.forFeature([User]), // Create a repository for the user entity, which can be injeted into my service
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, PassportModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres", // type of database
        host: configService.get<string>("DB_HOST"), // how to connect to the database
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"], // tables in my application
        synchronize: configService.get<string>("NODE_ENV") !== "production", // TypeORM will automatically create the database schema on every application launch (useful during dev, not recom. during prod.)
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRATION"),
        },
      }),
      inject: [ConfigService],
    }),
    DecksModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService, LocalStrategy, UserService, JwtStrategy],
})
export class AppModule {}
