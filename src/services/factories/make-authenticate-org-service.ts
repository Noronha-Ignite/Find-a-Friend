import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { AuthenticateOrgService } from '../authenticate-org-service'

export const makeAuthenticateOrgService = (): AuthenticateOrgService => {
  const orgRepository = new PrismaOrgRepository()

  const service = new AuthenticateOrgService(orgRepository)

  return service
}
