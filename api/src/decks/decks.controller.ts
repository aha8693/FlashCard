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
import { DecksService } from "./decks.service";
import { CreateDeckDto } from "./deck-create.dto";
import { DeckResponseDto } from "./deck-response.dto";
import { UpdateDeckDto } from "./deck-update-dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UserId } from "src/decorators/user-id.decorator";
import { DeckOwnershipGuard } from "src/guards/deck-owner.guard";
import { FindDecksQueryDTO } from "./find-decks-query.dto";
import { FindDecksResponseDTO } from "./find-decks-response.dto";

@UseGuards(JwtAuthGuard)
@UseInterceptors()
@Controller("decks")
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @UserId() userId: number,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.create(createDeckDto, userId);
    delete deck.userId;
    return deck;
  }

  @Get()
  async findAll(
    @UserId() userId: number,
    @Query() query: FindDecksQueryDTO,
  ): Promise<FindDecksResponseDTO> {
    const { limit, offset, search, username, withUserData } = query;
    
    const decks = await this.decksService.findAll(
      userId,
      limit,
      offset,
      search,
      withUserData,
    );
    return {
      limit,
      offset,
      search,
      username,
      withUserData,
      data: decks.map((deck) => {
        delete deck.userId;
          if (deck.user) { // Delete user's password if this deck is associated with user (In an ideal scenario, each deck is associated with one user)
            delete deck.user.password;
          }
        return deck;
      }),
    };
  }

  @UseGuards(DeckOwnershipGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<DeckResponseDto> {
    const deck = await this.decksService.findOne(id);
    if (!deck) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    delete deck.userId;
    return deck;
  }

  @UseGuards(DeckOwnershipGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePostDto: UpdateDeckDto,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.update(id, updatePostDto);
    delete deck.userId;
    return deck;
  }

  @UseGuards(DeckOwnershipGuard)
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<DeckResponseDto> {
    const deck = await this.decksService.remove(id);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    delete deck.userId;
    return deck;
  }

  // We will add handlers for CRUD endpoints here
}
