import { Module } from "@nestjs/common";
import { DecksService } from "./decks.service";
import { DecksController } from "./decks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Deck } from "./deck.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  providers: [DecksService], // interact with database
  controllers: [DecksController], // HTTP request
})
export class DecksModule {}
