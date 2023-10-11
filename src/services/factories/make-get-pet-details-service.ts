import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository'
import { GetPetDetailsService } from '../get-pet-details-service'

export const makeGetPetDetailsService = (): GetPetDetailsService => {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()

  const service = new GetPetDetailsService(petRepository, orgRepository)

  return service
}
