import { randomUUID } from 'node:crypto'

import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  private _pets: Pet[] = []

  async create(params: PetCreatePayload) {
    const pet: Pet = {
      id: randomUUID(),
      ...params,
    }

    this._pets.push(pet)

    return pet
  }
}
