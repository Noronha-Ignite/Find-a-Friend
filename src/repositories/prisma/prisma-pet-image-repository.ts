import { prisma } from '../../libs/prisma'
import { PetImageRepository } from '../pet-image-repository'

export class PrismaPetImageRepository implements PetImageRepository {
  async createMany(petId: string, imageUrls: string[]) {
    await prisma.petImage.createMany({
      data: imageUrls.map((url) => ({
        image_url: url,
        pet_id: petId,
      })),
    })

    return await this.findManyByPetId(petId)
  }

  async findManyByPetId(petId: string) {
    return await prisma.petImage.findMany({
      where: {
        pet_id: petId,
      },
    })
  }
}
