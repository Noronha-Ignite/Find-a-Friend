import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { createAndAuthenticateOrg } from '../../../utils/tests/create-and-authenticate-org'

describe('Fetch pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets', async () => {
    const { token } = await createAndAuthenticateOrg(app, {
      city: 'known-city',
    })

    await request(app.server)
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

    await request(app.server)
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

    const response = await request(app.server)
      .get('/pets/city/known-city')
      .query({
        independecyLevel: 'LOW',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
    ])
  })
})
