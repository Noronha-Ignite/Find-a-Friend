import { prisma } from '../../libs/prisma'
import { PetRepository } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async create(data: PetCreatePayload) {
    return await prisma.pet.create({
      data,
    })
  }

  async findById(id: string) {
    return await prisma.pet.findUnique({
      where: {
        id,
      },
    })
  }

  async findManyFiltered(params: FetchPetsParams) {
    return await prisma.pet.findMany({
      where: {
        organization: {
          city: {
            contains: params.city,
          },
        },

        OR: [
          { age: params.age },
          { size: params.size },
          { energy_level: params.energyLevel },
          { independency_level: params.independencyLevel },
        ],
      },
    })
  }
}
