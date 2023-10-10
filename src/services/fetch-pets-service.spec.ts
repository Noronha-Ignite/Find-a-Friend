import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet-repository'
import { OrgRepository } from '../repositories/org-repository'
import { PetRepository } from '../repositories/pet-repository'
import { createOrganization } from '../utils/tests/create-organization'
import { createPet } from '../utils/tests/create-pet'
import { FetchPetsService } from './fetch-pets-service'

let petRepository: PetRepository
let orgRepository: OrgRepository
let sut: FetchPetsService

describe('Fetch Pets service', async () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new FetchPetsService(petRepository)
  })

  it('should be able to fetch pets', async () => {
    const { id: orgId } = await createOrganization(orgRepository, {
      city: 'wonderful-city',
    })

    await createPet(petRepository, orgId)
    await createPet(petRepository, orgId)
    await createPet(petRepository, orgId)

    const { pets } = await sut.execute({
      city: 'wonderful-city',
    })

    expect(pets).toHaveLength(3)

    expect(pets).toEqual([
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
    ])
  })

  it('should be able to filter while fetching pets', async () => {
    const { id: orgId } = await createOrganization(orgRepository, {
      city: 'wonderful-city',
    })

    await createPet(petRepository, orgId, {
      energy_level: 'HIGH',
      age: 'GROWN_UP',
    })
    await createPet(petRepository, orgId, {
      energy_level: 'HIGH',
    })
    await createPet(petRepository, orgId)

    const { pets } = await sut.execute({
      city: 'wonderful-city',
      energyLevel: 'HIGH',
      age: 'GROWN_UP',
    })

    expect(pets).toHaveLength(1)

    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        energy_level: 'HIGH',
        age: 'GROWN_UP',
      }),
    ])
  })
})
