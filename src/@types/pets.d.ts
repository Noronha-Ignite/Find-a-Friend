type PetType = 'CAT' | 'DOG'

type PetAge = 'NEW_BORN' | 'YOUNG' | 'GROWN_UP'

type PetSize = 'SMALLER' | 'SMALL' | 'MEDIUM' | 'BIG'

type Level = 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'

type PetImage = {
  id: string
  image_url: string
  pet_id: string
}

type PetAdoptionRequirement = {
  id: string
  requirement: string
  pet_id: string
}

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

type PetCreateBody = Omit<Pet, 'id'> & {
  images: Buffer[]
  requirements: string[]
}

type PetCreatePayload = Omit<Pet, 'id'>

type FetchPetsParams = {
  city: string
  age?: PetAge
  energyLevel?: Level
  independencyLevel?: Level
  size?: PetSize
}
