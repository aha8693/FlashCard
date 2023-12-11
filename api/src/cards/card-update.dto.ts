import { IsOptional, IsString } from "class-validator";

export class UpdateCardDTO {
  @IsOptional()
  @IsString()
  front?: string;

  @IsOptional()
  @IsString()
  back?: string;
}
