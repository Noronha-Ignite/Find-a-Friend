import { faker } from '@faker-js/faker'
import { hash, genSalt } from 'bcryptjs'
import { OrgRepository } from '../../repositories/org-repository'

export const createOrganization = async (
  orgRepository: OrgRepository,
  customProps?: Partial<OrgCreatePayload>,
) => {
  return await orgRepository.create({
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    cep: faker.location.zipCode(),
    city: faker.location.city(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    whatsapp: faker.phone.number(),
    password_hash: await hash(faker.internet.password(), await genSalt(6)),
    ...customProps,
  })
}
