import { genSalt, hash } from 'bcryptjs'
import { OrgRepository } from '../repositories/org-repository'
import { sanitizeOrganization } from '../utils/sanitize-organization'

export class CreateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ password, ...params }: OrgCreateBody) {
    const salt = await genSalt(6)

    const password_hash = await hash(password, salt)

    const organization = await this.orgRepository.create({
      ...params,
      password_hash,
    })

    const sanitizedOrganization = sanitizeOrganization(organization)

    return { organization: sanitizedOrganization }
  }
}
