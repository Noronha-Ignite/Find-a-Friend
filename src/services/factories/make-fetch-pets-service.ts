import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository'
import { FetchPetsService } from '../fetch-pets-service'

export const makeFetchPetsService = (): FetchPetsService => {
  const petRepository = new PrismaPetRepository()

  const service = new FetchPetsService(petRepository)

  return service
}
