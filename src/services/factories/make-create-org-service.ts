import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { CreateOrgService } from '../create-org-service'

export const makeCreateOrgService = (): CreateOrgService => {
  const orgRepository = new PrismaOrgRepository()

  const service = new CreateOrgService(orgRepository)

  return service
}
