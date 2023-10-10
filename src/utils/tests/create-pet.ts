import { faker } from '@faker-js/faker'
import { PetRepository } from '../../repositories/pet-repository'

export const createPet = async (
  petRepository: PetRepository,
  orgId: string,
  customProps?: Partial<PetCreatePayload>,
) => {
  return await petRepository.create({
    organization_id: orgId,
    about: faker.lorem.paragraphs(),
    age: 'YOUNG',
    energy_level: 'MEDIUM',
    independency_level: 'MEDIUM',
    name: faker.person.firstName(),
    size: 'MEDIUM',
    type: 'DOG',
    ...customProps,
  })
}
