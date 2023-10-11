export interface PetRepository {
  create(params: PetCreatePayload): Promise<Pet>

  findById(id: string): Promise<PetWithImagesAndRequirements | null>

  findManyFiltered(filters: FetchPetsParams): Promise<Pet[]>
}
