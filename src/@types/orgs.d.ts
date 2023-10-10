type Organization = {
  id: string
  email: string
  password_hash: string
  cep: string
  city: string
  address: string
  latitude: number
  longitude: number
  whatsapp: string
}

type OrgCreateBody = Omit<Organization, 'id' | 'password_hash'> & {
  password: string
}

type OrgCreatePayload = Omit<Organization, 'id'>
