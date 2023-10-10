export interface PetImageRepository {
  createMany(petId: string, imageUrls: string[]): Promise<PetImage[]>

  findManyByPetId(petId: string): Promise<PetImage[]>
}
