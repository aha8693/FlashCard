import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { CreateDeckDto } from "./deck-create.dto";
import { UpdateDeckDto } from "./deck-update-dto";

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
  ) {}

  async create(createDeckDto: CreateDeckDto, userId: number): Promise<Deck> {
    const deck = await this.deckRepository.create({
      ...createDeckDto,
      userId,
    });
    return this.deckRepository.save(deck);
  }

  async findOne(id: string): Promise<Deck | null> {
    return this.deckRepository.findOneBy({ id });
  }

  async findAll(
    userId: number,
    limit: number,
    offset: number,
    search?: string,
    withUserData?: boolean,
  ): Promise<Deck[]> {
    const queryBuilder = this.deckRepository
      .createQueryBuilder("deck")
      .where("deck.userId = :userId", { userId });

    if (withUserData) {
      queryBuilder.leftJoinAndSelect("deck.user", "user")
    }
    if (search !== undefined) {
      queryBuilder.andWhere("deck.title ILIKE :search", {
        search: `%${search}%`,
      });
    }

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);

    queryBuilder.orderBy("deck.createdAt", "DESC");

    return queryBuilder.getMany();
  }

  async update(id: string, updateDeckDto: UpdateDeckDto): Promise<Deck | null> {
    const deck = await this.deckRepository.preload({ id, ...updateDeckDto });
    if (!deck) {
      return null;
    }
    return this.deckRepository.save(deck);
  }

  async remove(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }
    this.deckRepository.remove(deck);
    return deck;
  }

  // We'll add methods for handling CRUD operations here
}
