export interface PetRepository {
  create(params: PetCreatePayload): Promise<Pet>

  findManyFiltered(filters: FetchPetsParams): Promise<Pet[]>
}
