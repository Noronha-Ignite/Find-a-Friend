import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository'
import { AdoptPetService } from '../adopt-pet-service'

export const makeAdoptPetService = (): AdoptPetService => {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()

  const service = new AdoptPetService(petRepository, orgRepository)

  return service
}
