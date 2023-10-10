import { PetRepository } from '../repositories/pet-repository'

export class FetchPetsService {
  constructor(private petRepository: PetRepository) {}

  async execute(params: FetchPetsParams) {
    const pets = await this.petRepository.findManyFiltered(params)

    return { pets }
  }
}
