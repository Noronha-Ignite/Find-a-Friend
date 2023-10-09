import { Organization } from '@prisma/client'

type SanitizedOrganization = Omit<Organization, 'password_hash'>

export const sanitizeOrganization = (
  org: Organization,
): SanitizedOrganization => {
  return Object.fromEntries(
    Object.entries(org).filter(([key]) => key !== 'password_hash'),
  ) as SanitizedOrganization
}
