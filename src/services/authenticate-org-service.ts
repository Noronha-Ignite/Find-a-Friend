import { compare } from 'bcryptjs'
import { OrgRepository } from '../repositories/org-repository'
import { sanitizeOrganization } from '../utils/sanitize-organization'
import { InvalidDataError } from './errors/invalid-data-error'

type AuthenticateOrgServiceParams = {
  email: string
  password: string
}

export class AuthenticateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ password, email }: AuthenticateOrgServiceParams) {
    const organization = await this.orgRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidDataError()
    }

    const doesPasswordsMatch = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordsMatch) {
      throw new InvalidDataError()
    }

    const sanitizedOrganization = sanitizeOrganization(organization)

    return { organization: sanitizedOrganization }
  }
}
