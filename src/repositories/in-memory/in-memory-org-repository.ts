import { randomUUID } from 'node:crypto'
import { OrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements OrgRepository {
  private _orgs: Organization[] = []

  async create(params: OrgCreatePayload) {
    const org: Organization = {
      id: randomUUID(),
      ...params,
    }

    this._orgs.push(org)

    return org
  }

  async findByEmail(email: string) {
    return this._orgs.find((org) => org.email === email) ?? null
  }

  async findById(id: string) {
    return this._orgs.find((org) => org.id === id) ?? null
  }
}
