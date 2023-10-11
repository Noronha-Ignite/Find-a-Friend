import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidDataError } from '../../../services/errors/invalid-data-error'
import { OrgNotFoundError } from '../../../services/errors/org-not-found-error'
import { makeCreatePetService } from '../../../services/factories/make-create-pet-service'

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
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
    requirements: z.array(z.string()),
    images: z.array(
      z.custom<Buffer>((data) => {
        if (!Buffer.isBuffer(data)) {
          throw new InvalidDataError()
        }
        return data
      }),
    ),
  })

  const orgId = req.user.sub
  const body = createPetBodySchema.parse(req.body)

  const createPetService = makeCreatePetService()

  try {
    const { pet } = await createPetService.execute({
      about: body.about,
      age: body.age,
      energy_level: body.energyLevel,
      images: body.images,
      independency_level: body.independencyLevel,
      name: body.name,
      requirements: body.requirements,
      size: body.size,
      type: body.type,
      organization_id: orgId,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
