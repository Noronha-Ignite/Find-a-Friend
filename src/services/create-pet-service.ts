import { OrgRepository } from '../repositories/org-repository'
import { PetRepository } from '../repositories/pet-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

export class CreatePetService {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute(params: PetCreateBody) {
    const org = await this.orgRepository.findById(params.organization_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petRepository.create(params)

    return { pet }
  }
}
