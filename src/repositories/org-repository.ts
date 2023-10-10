export interface OrgRepository {
  create(params: OrgCreatePayload): Promise<Organization>

  findByEmail(email: string): Promise<Organization | null>

  findById(id: string): Promise<Organization | null>

  findManyByCity(city: string): Promise<Organization[]>
}
