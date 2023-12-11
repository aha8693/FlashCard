import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  Patch,
  Delete,
  Query,
  UseInterceptors,
} from "@nestjs/common";

import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UserId } from "src/decorators/user-id.decorator";
import { DeckOwnershipGuard } from "src/guards/deck-owner.guard";
import { CardsService } from "./cards.service";
import { CreateCardDTO } from "./card-create.dto";
import { CardsResponseDTO } from "./card-response.dto";
import { FindCardsQueryDTO } from "./find-decks-query.dto";
import { FindCardsResponseDTO } from "./find-decks-response.dto";
import { UpdateCardDTO } from "./card-update.dto";

@UseGuards(JwtAuthGuard)
@UseInterceptors()
@Controller("decks/:deckId/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(
    @Body() createCardDto: CreateCardDTO,
    @Param("deckId") deckId: string,
  ): Promise<CardsResponseDTO> {
    const card = await this.cardsService.create(createCardDto, deckId);
    return card;
  }

  @Get()
  async findAll(
    @Param("deckId") deckId: string,
    @Query() query: FindCardsQueryDTO,
  ): Promise<FindCardsResponseDTO> {
    const { limit, offset, search } = query;

    const cards = await this.cardsService.findAll(
      deckId,
      limit,
      offset,
      search,
    );
    return {
      limit,
      offset,
      search,
      data: cards.map((card) => {
        return card;
      }),
    };
  }

  @UseGuards(DeckOwnershipGuard)
  @Get(":cardId")
  async findOne(
    @Param("deckId") id: string,
    @Param("cardId") cardId: string,
  ): Promise<CardsResponseDTO> {
    const card = await this.cardsService.findOne(cardId);
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }
    return card;
  }

  @UseGuards(DeckOwnershipGuard)
  @Patch(":cardId")
  async update(
    @Param("cardId") id: string,
    @Body() updatePostDto: UpdateCardDTO,
  ): Promise<CardsResponseDTO> {
    const deck = await this.cardsService.update(id, updatePostDto);
    return deck;
  }

  @UseGuards(DeckOwnershipGuard)
  @Delete(":cardId")
  async remove(
    @Param("cardId") id: string,
    @Param("deckId") deckId: string,
  ): Promise<void> {
    const card = await this.cardsService.remove(id, deckId);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
  }
  // We will add handlers for CRUD endpoints here
}
