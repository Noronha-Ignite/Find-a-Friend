import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgNotFoundError } from '../../../services/errors/org-not-found-error'
import { ResourceNotFoundError } from '../../../services/errors/resource-not-found-error'
import { makeGetPetDetailsService } from '../../../services/factories/make-get-pet-details-service'

export const getDetails = async (req: FastifyRequest, reply: FastifyReply) => {
  const getDetailsParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getDetailsParamsSchema.parse(req.params)

  const getPetDetailsService = makeGetPetDetailsService()
  try {
    const pet = await getPetDetailsService.execute({
      petId,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (
      err instanceof ResourceNotFoundError ||
      err instanceof OrgNotFoundError
    ) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
