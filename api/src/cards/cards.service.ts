import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Card } from "./card.entity";
import { CreateCardDTO } from "./card-create.dto";
import { DecksService } from "src/decks/decks.service";
import { UpdateCardDTO } from "./card-update.dto";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) // Enable us to access methods provided by the repository (i.e. querying the database)
    private readonly cardRepository: Repository<Card>,
    private readonly decksService: DecksService,
  ) {}

  // TODO: Add operations

  async create(CreateCardDTO: CreateCardDTO, deckId: string): Promise<Card> {
    const card = this.cardRepository.create({
      ...CreateCardDTO,
      deckId, // Associate the card with a deck
    });

    await this.decksService.incrementCardCounter(deckId);
    return this.cardRepository.save(card);
  }

  async findOne(id: string): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id });
  }

  async findAll(
    deckId: string,
    limit: number,
    offset: number,
    search?: string,
  ): Promise<Card[]> {
    const queryBuilder = await this.cardRepository
      .createQueryBuilder("card")
      .where("card.deckId = :deckId", { deckId });

    if (search !== undefined) {
      queryBuilder.andWhere(
        "card.front ILIKE :search OR card.back ILIKE :search",
        {
          search: `%${search}%`,
        },
      );
    }

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);
    queryBuilder.orderBy("card.createdAt", "DESC");

    return queryBuilder.getMany();
  }

  async update(id: string, updateCardDto: UpdateCardDTO): Promise<Card | null> {
    const deck = await this.cardRepository.preload({ id, ...updateCardDto });
    if (!deck) {
      return null;
    }
    return this.cardRepository.save(deck);
  }

  async remove(id: string, deckId: string): Promise<Card | null> {
    const card = await this.findOne(id);
    if (!card) {
      return null;
    }
    this.cardRepository.remove(card);
    await this.decksService.decrementCardCounter(deckId);
    return card;
  }
}
