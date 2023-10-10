import { prisma } from '../../libs/prisma'
import { PetAdoptionRequirementRepository } from '../pet-adoption-requirements-repository'

export class PrismaPetAdoptionRequirementRepository
  implements PetAdoptionRequirementRepository
{
  async createMany(petId: string, requirements: string[]) {
    await prisma.petAdoptionRequirement.createMany({
      data: requirements.map((requirement) => ({
        requirement,
        pet_id: petId,
      })),
    })

    return await this.findManyByPetId(petId)
  }

  async findManyByPetId(petId: string) {
    return await prisma.petAdoptionRequirement.findMany({
      where: {
        pet_id: petId,
      },
    })
  }
}
