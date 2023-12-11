import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardDTO {
  @IsString()
  @IsNotEmpty({ message: "Front content cannot be empty" })
  front: string;

  @IsString()
  @IsNotEmpty({ message: "Back content cannot be empty" })
  back: string;
}
