export interface PetRepository {
  create(params: PetCreatePayload): Promise<Pet>

  findById(id: string): Promise<Pet | null>

  findManyFiltered(filters: FetchPetsParams): Promise<Pet[]>
}
