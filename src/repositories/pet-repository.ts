export interface PetRepository {
  create(params: PetCreatePayload): Promise<Pet>
}
