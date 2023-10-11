import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { createAndAuthenticateOrg } from '../../../utils/tests/create-and-authenticate-org'

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        about: faker.lorem.paragraphs(),
        age: 'NEW_BORN',
        energyLevel: 'HIGH',
        independencyLevel: 'LOW',
        name: faker.person.firstName(),
        size: 'SMALL',
        type: 'DOG',
        images: [],
        requirements: [],
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      pet: expect.objectContaining({
        id: expect.any(String),
      }),
    })
  })
})
