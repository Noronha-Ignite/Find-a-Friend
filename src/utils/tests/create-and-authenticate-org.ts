import { faker } from '@faker-js/faker'
import { genSalt, hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '../../libs/prisma'

export const createAndAuthenticateOrg = async (
  app: FastifyInstance,
  customProps?: Partial<OrgCreatePayload>,
) => {
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
      ...customProps,
    },
  })

  const authResponse = await request(app.server).post('/orgs/sessions').send({
    email,
    password,
  })

  const { token } = authResponse.body

  return { token }
}
