import { OrgRepository } from '../repositories/org-repository'
import { PetRepository } from '../repositories/pet-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type AdoptPetServiceParams = {
  orgId: string
  petId: string
}

export class AdoptPetService {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({ petId, orgId }: AdoptPetServiceParams) {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petRepository.findById(petId)

    if (!pet || pet.organization_id !== org.id) {
      throw new ResourceNotFoundError()
    }

    const customMessage = encodeURIComponent(
      `Hey! I'd like to adopt the ${pet.name}!`,
    )

    const formattedNumber = org.whatsapp.replace(/\D/g, '')

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${customMessage}`

    return { whatsappUrl }
  }
}
