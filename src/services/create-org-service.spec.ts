import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'
import { OrgRepository } from '../repositories/org-repository'
import { createOrganization } from '../utils/tests/create-organization'
import { CreateOrgService } from './create-org-service'
import { EmailAlreadyExistsError } from './errors/email-already-exists.error'

let orgRepository: OrgRepository
let sut: CreateOrgService

describe('Create organization service', async () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    sut = new CreateOrgService(orgRepository)
  })

  it('should be able to create an organization', async () => {
    const { organization } = await sut.execute({
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      email: faker.internet.email(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      password: faker.internet.password(),
      whatsapp: faker.phone.number(),
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )

    expect(organization).not.toHaveProperty('password_hash')
  })

  it('should not be able to create an organization with an existing email', async () => {
    await createOrganization(orgRepository, {
      email: 'existing@email.com',
    })

    await expect(() =>
      sut.execute({
        address: faker.location.streetAddress(),
        cep: faker.location.zipCode(),
        city: faker.location.city(),
        email: 'existing@email.com',
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        password: faker.internet.password(),
        whatsapp: faker.phone.number(),
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
