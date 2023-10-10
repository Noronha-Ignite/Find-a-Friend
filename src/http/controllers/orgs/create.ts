import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EmailAlreadyExistsError } from '../../../services/errors/email-already-exists.error'
import { makeCreateOrgService } from '../../../services/factories/make-create-org-service'

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const createOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
    cep: z.string(),
    city: z.string(),
    address: z.string(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    whatsapp: z.string(),
  })

  const body = createOrgBodySchema.parse(req.body)

  const createOrgService = makeCreateOrgService()

  try {
    const { organization } = await createOrgService.execute(body)

    return reply.status(201).send({ organization })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
