import { Organization, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(params: Prisma.OrganizationCreateInput): Promise<Organization>
}