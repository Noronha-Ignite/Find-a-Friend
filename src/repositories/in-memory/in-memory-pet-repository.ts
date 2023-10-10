import { randomUUID } from 'node:crypto'

import { OrgRepository } from '../org-repository'
import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  private _pets: Pet[] = []

  constructor(private orgRepository: OrgRepository) {}

  async create(params: PetCreatePayload) {
    const pet: Pet = {
      id: randomUUID(),
      ...params,
    }

    this._pets.push(pet)

    return pet
  }

  async findById(id: string) {
    return this._pets.find((pet) => pet.id === id) ?? null
  }

  async findManyFiltered(params: FetchPetsParams) {
    const cityOrgIds = (
      await this.orgRepository.findManyByCity(params.city)
    ).map((city) => city.id)

    return this._pets.filter((pet) => {
      return (
        cityOrgIds.includes(pet.organization_id) &&
        (!params.energyLevel || params.energyLevel === pet.energy_level) &&
        (!params.age || params.age === pet.age) &&
        (!params.independencyLevel ||
          params.independencyLevel === pet.independency_level) &&
        (!params.size || params.size === pet.size)
      )
    })
  }
}
