import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { createAndAuthenticateOrg } from '../../../utils/tests/create-and-authenticate-org'

describe('Get pet details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const { token } = await createAndAuthenticateOrg(app, {
      city: 'known-city',
    })

    const petName = faker.person.firstName()

    const petCreationResponse = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        about: faker.lorem.paragraphs(),
        age: 'NEW_BORN',
        energyLevel: 'HIGH',
        independencyLevel: 'LOW',
        name: petName,
        size: 'SMALL',
        type: 'DOG',
        images: [],
        requirements: [],
      })

    const { id: petId } = petCreationResponse.body.pet

    const response = await request(app.server).get(`/pets/${petId}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: petName,
      }),
    )
  })
})
