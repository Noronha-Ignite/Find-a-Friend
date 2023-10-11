import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('Create org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an organization', async () => {
    const response = await request(app.server).post(`/orgs`).send({
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      whatsapp: faker.phone.number(),
      password: faker.internet.password(),
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
