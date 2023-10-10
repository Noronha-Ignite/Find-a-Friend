type Organization = {
  id: string
  email: string
  password_hash: string
  cep: string
  address: string
  latitude: number
  longitude: number
  whatsapp: string
}

type OrgCreateBody = {
  email: string
  password: string
  cep: string
  address: string
  latitude: number
  longitude: number
  whatsapp: string
}

type OrgCreatePayload = Omit<OrgCreateBody, 'password'> & {
  password_hash: string
}
