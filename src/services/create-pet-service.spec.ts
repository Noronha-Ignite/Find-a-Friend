import { faker } from '@faker-js/faker'

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
import { CreatePetService } from './create-pet-service'
import { OrgNotFoundError } from './errors/org-not-found-error'

let petRepository: PetRepository
let orgRepository: OrgRepository
let petImageRepository: PetImageRepository
let petAdoptionRequirementRepository: PetAdoptionRequirementRepository
let sut: CreatePetService

describe('Create Pet service', async () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    petImageRepository = new InMemoryPetImageRepository()
    petAdoptionRequirementRepository =
      new InMemoryPetAdoptionRequirementRepository()
    petRepository = new InMemoryPetRepository(orgRepository)

    sut = new CreatePetService(
      petRepository,
      orgRepository,
      petImageRepository,
      petAdoptionRequirementRepository,
    )
  })

  it('should be able to create a pet', async () => {
    const { id } = await createOrganization(orgRepository)

    const { pet } = await sut.execute({
      about: faker.lorem.paragraphs(),
      age: 'NEW_BORN',
      energy_level: 'HIGH',
      independency_level: 'LOW',
      name: faker.person.firstName(),
      size: 'SMALL',
      type: 'DOG',
      organization_id: id,
      images: [],
      requirements: [],
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not create a pet if an invalid organization is provided', async () => {
    await expect(() =>
      sut.execute({
        about: faker.lorem.paragraphs(),
        age: 'NEW_BORN',
        energy_level: 'HIGH',
        independency_level: 'LOW',
        name: faker.person.firstName(),
        size: 'SMALL',
        type: 'DOG',
        organization_id: 'non-existent-org-id',
        images: [],
        requirements: [],
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
