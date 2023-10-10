import { randomUUID } from 'node:crypto'
import { PetImageRepository } from '../pet-image-repository'

export class InMemoryPetImageRepository implements PetImageRepository {
  private _petImages: PetImage[] = []

  async createMany(petId: string, imageUrls: string[]) {
    return imageUrls.map((image) => {
      const createdImage: PetImage = {
        id: randomUUID(),
        image_url: image,
        pet_id: petId,
      }

      this._petImages.push(createdImage)

      return createdImage
    })
  }

  async findManyByPetId(petId: string) {
    return this._petImages.filter((image) => image.pet_id === petId)
  }
}
