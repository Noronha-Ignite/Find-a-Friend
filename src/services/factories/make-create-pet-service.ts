import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { PrismaPetAdoptionRequirementRepository } from '../../repositories/prisma/prisma-pet-adoption-requirement-repository'
import { PrismaPetImageRepository } from '../../repositories/prisma/prisma-pet-image-repository'
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository'
import { CreatePetService } from '../create-pet-service'

export const makeCreatePetService = (): CreatePetService => {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const petImageRepository = new PrismaPetImageRepository()
  const petAdoptionRequirementRepository =
    new PrismaPetAdoptionRequirementRepository()

  const createPetService = new CreatePetService(
    petRepository,
    orgRepository,
    petImageRepository,
    petAdoptionRequirementRepository,
  )

  return createPetService
}
