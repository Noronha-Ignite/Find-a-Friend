import { faker } from '@faker-js/faker'
import { hash, genSalt } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { prisma } from '../../../libs/prisma'

describe('Authenticate org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an organization', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await prisma.organization.create({
      data: {
        email,
        address: faker.location.streetAddress(),
        cep: faker.location.zipCode(),
        city: faker.location.city(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        whatsapp: faker.phone.number(),
        password_hash: await hash(password, await genSalt(6)),
      },
    })

    const response = await request(app.server).post(`/orgs/sessions`).send({
      email,
      password,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
