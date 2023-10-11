import { OrgRepository } from '../repositories/org-repository'
import { PetRepository } from '../repositories/pet-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetPetDetailsServiceParams = {
  petId: string
}

export class GetPetDetailsService {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({ petId }: GetPetDetailsServiceParams) {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const org = await this.orgRepository.findById(pet.organization_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    return pet
  }
}
