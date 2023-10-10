type PetType = 'CAT' | 'DOG'

type PetAge = 'NEW_BORN' | 'YOUNG' | 'GROWN_UP'

type PetSize = 'SMALLER' | 'SMALL' | 'MEDIUM' | 'BIG'

type Level = 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'

type Pet = {
  id: string
  name: string
  about: string
  type: PetType
  age: PetAge
  size: PetSize
  energy_level: Level
  independency_level: Level
  organization_id: string
}

type PetCreateBody = {
  name: string
  about: string
  type: PetType
  age: PetAge
  size: PetSize
  energy_level: Level
  independency_level: Level

  organization_id: string
}

type PetCreatePayload = PetCreateBody
