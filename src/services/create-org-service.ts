import { genSalt, hash } from 'bcryptjs'
import { OrgRepository } from '../repositories/org-repository'
import { sanitizeOrganization } from '../utils/sanitize-organization'
import { EmailAlreadyExistsError } from './errors/email-already-exists.error'

export class CreateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ password, ...params }: OrgCreateBody) {
    const alreadyExistentOrgWithEmail = await this.orgRepository.findByEmail(
      params.email,
    )

    if (alreadyExistentOrgWithEmail) {
      throw new EmailAlreadyExistsError()
    }

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
