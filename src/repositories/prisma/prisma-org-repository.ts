import { prisma } from '../../libs/prisma'
import { OrgRepository } from '../org-repository'

export class PrismaOrgRepository implements OrgRepository {
  async create(data: OrgCreatePayload) {
    return await prisma.organization.create({
      data,
    })
  }

  async findById(id: string) {
    return await prisma.organization.findUnique({
      where: {
        id,
      },
    })
  }

  async findManyByCity(city: string) {
    return await prisma.organization.findMany({
      where: {
        city: {
          contains: city,
        },
      },
    })
  }

  async findByEmail(email: string) {
    return await prisma.organization.findUnique({
      where: {
        email,
      },
    })
  }
}
