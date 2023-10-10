import { faker } from '@faker-js/faker'
import { genSalt, hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'
import { OrgRepository } from '../repositories/org-repository'
import { AuthenticateOrgService } from './authenticate-org-service'

let orgRepository: OrgRepository
let sut: AuthenticateOrgService

describe('Create organization service', async () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    sut = new AuthenticateOrgService(orgRepository)
  })

  it('should be able to authenticate an organization', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const createdOrganization = {
      email,
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      whatsapp: faker.phone.number(),
    }

    await orgRepository.create({
      ...createdOrganization,
      password_hash: await hash(password, await genSalt(6)),
    })

    const { organization } = await sut.execute({
      email,
      password,
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )

    expect(organization).not.toHaveProperty('password_hash')
  })
})
