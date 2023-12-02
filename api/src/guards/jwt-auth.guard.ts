import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// determines if they have the necessary permissions to access the requested resource.
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
