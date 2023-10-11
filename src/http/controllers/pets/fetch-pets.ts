import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsService } from '../../../services/factories/make-fetch-pets-service'

export const fetchPets = async (req: FastifyRequest, reply: FastifyReply) => {
  const fetchPetsParamsSchema = z.object({
    city: z.string(),
  })

  const fetchPetsQuerySchema = z.object({
    type: z.enum(['CAT', 'DOG']),
    age: z.enum(['NEW_BORN', 'YOUNG', 'GROWN_UP']),
    size: z.enum(['SMALLER', 'SMALL', 'MEDIUM', 'BIG']),
    energyLevel: z.enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
    independencyLevel: z.enum([
      'VERY_LOW',
      'LOW',
      'MEDIUM',
      'HIGH',
      'VERY_HIGH',
    ]),
  })

  const { city } = fetchPetsParamsSchema.parse(req.params)
  const query = fetchPetsQuerySchema.parse(req.query)

  const fetchPetService = makeFetchPetsService()

  const { pets } = await fetchPetService.execute({
    ...query,
    city,
  })

  return reply.status(200).send({ pets })
}
