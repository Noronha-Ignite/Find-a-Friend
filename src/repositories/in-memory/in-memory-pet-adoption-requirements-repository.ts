import { randomUUID } from 'node:crypto'
import { PetAdoptionRequirementRepository } from '../pet-adoption-requirements-repository'

export class InMemoryPetAdoptionRequirementRepository
  implements PetAdoptionRequirementRepository
{
  private _petAdoptionRequirements: PetAdoptionRequirement[] = []

  async createMany(petId: string, requirements: string[]) {
    return requirements.map((requirement) => {
      const createdRequirement: PetAdoptionRequirement = {
        id: randomUUID(),
        requirement,
        pet_id: petId,
      }

      this._petAdoptionRequirements.push(createdRequirement)

      return createdRequirement
    })
  }

  async findManyByPetId(petId: string) {
    return this._petAdoptionRequirements.filter(
      (requirement) => requirement.pet_id === petId,
    )
  }
}
