export interface PetAdoptionRequirementRepository {
  createMany(
    petId: string,
    requirement: string[],
  ): Promise<PetAdoptionRequirement[]>

  findManyByPetId(petId: string): Promise<PetAdoptionRequirement[]>
}
