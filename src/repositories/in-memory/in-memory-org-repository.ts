import { randomUUID } from 'node:crypto'
import { Organization, Prisma } from '@prisma/client'
import { OrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements OrgRepository {
  private _orgs: Organization[] = []

  async create(params: Prisma.OrganizationCreateInput) {
    const org: Organization = {
      id: randomUUID(),
      ...params,
    }

    this._orgs.push(org)

    return org
  }
}
