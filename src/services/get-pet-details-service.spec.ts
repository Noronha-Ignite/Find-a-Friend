import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'
import { InMemoryPetAdoptionRequirementRepository } from '../repositories/in-memory/in-memory-pet-adoption-requirements-repository'
import { InMemoryPetImageRepository } from '../repositories/in-memory/in-memory-pet-image-repository'
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet-repository'
import { OrgRepository } from '../repositories/org-repository'
import { PetAdoptionRequirementRepository } from '../repositories/pet-adoption-requirements-repository'
import { PetImageRepository } from '../repositories/pet-image-repository'
import { PetRepository } from '../repositories/pet-repository'
import { createOrganization } from '../utils/tests/create-organization'
import { createPet } from '../utils/tests/create-pet'
import { GetPetDetailsService } from './get-pet-details-service'

let petRepository: PetRepository
let orgRepository: OrgRepository
let petImageRepository: PetImageRepository
let petAdoptionRequirementRepository: PetAdoptionRequirementRepository
let sut: GetPetDetailsService

describe('Get pet details service', async () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    petImageRepository = new InMemoryPetImageRepository()
    petAdoptionRequirementRepository =
      new InMemoryPetAdoptionRequirementRepository()
    petRepository = new InMemoryPetRepository(
      orgRepository,
      petImageRepository,
      petAdoptionRequirementRepository,
    )

    sut = new GetPetDetailsService(petRepository, orgRepository)
  })

  it('should be able to get pet details', async () => {
    const { id: orgId } = await createOrganization(orgRepository, {
      city: 'wonderful-city',
    })

    const { id: petId } = await createPet(petRepository, orgId, {
      name: 'Danger',
    })

    const pet = await sut.execute({ petId })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        petImages: [],
        petAdoptionRequirements: [],
      }),
    )
  })
})
