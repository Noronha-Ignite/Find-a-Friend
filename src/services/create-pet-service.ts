import { uploadImageImgur } from '../external/imgur'
import { OrgRepository } from '../repositories/org-repository'
import { PetAdoptionRequirementRepository } from '../repositories/pet-adoption-requirements-repository'
import { PetImageRepository } from '../repositories/pet-image-repository'
import { PetRepository } from '../repositories/pet-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

export class CreatePetService {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
    private petImageRepository: PetImageRepository,
    private petAdoptionRequirementRepository: PetAdoptionRequirementRepository,
  ) {}

  async execute({ images, requirements, ...params }: PetCreateBody) {
    const org = await this.orgRepository.findById(params.organization_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const uploadedImages = await Promise.all(
      images.map((image) => uploadImageImgur(image)),
    )

    const pet = await this.petRepository.create(params)
    const petImages = await this.petImageRepository.createMany(
      pet.id,
      uploadedImages,
    )
    const petRequirements =
      await this.petAdoptionRequirementRepository.createMany(
        pet.id,
        requirements,
      )

    return {
      pet: {
        ...pet,
        petImages,
        petRequirements,
      },
    }
  }
}
