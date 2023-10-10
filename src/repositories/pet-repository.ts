export interface PetRepository {
  create(params: PetCreatePayload): Promise<Pet>

  findById(id: string): Promise<Pet | undefined>

  findManyFiltered(filters: FetchPetsParams): Promise<Pet[]>
}
