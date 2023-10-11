import { randomUUID } from 'node:crypto'

import { OrgRepository } from '../org-repository'
import { PetAdoptionRequirementRepository } from '../pet-adoption-requirements-repository'
import { PetImageRepository } from '../pet-image-repository'
import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  private _pets: Pet[] = []

  constructor(
    private orgRepository: OrgRepository,
    private petImageRepository: PetImageRepository,
    private petAdoptionRequirementRepository: PetAdoptionRequirementRepository,
  ) {}

  async create(params: PetCreatePayload) {
    const pet: Pet = {
      id: randomUUID(),
      ...params,
    }

    this._pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this._pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    const images = await this.petImageRepository.findManyByPetId(id)
    const requirements =
      await this.petAdoptionRequirementRepository.findManyByPetId(id)

    return {
      ...pet,
      petImages: images,
      petAdoptionRequirements: requirements,
    }
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
        (!params.type || params.type === pet.type) &&
        (!params.independencyLevel ||
          params.independencyLevel === pet.independency_level) &&
        (!params.size || params.size === pet.size)
      )
    })
  }
}
