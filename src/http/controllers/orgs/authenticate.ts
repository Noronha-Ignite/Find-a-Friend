import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidDataError } from '../../../services/errors/invalid-data-error'
import { makeAuthenticateOrgService } from '../../../services/factories/make-authenticate-org-service'

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const createOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const body = createOrgBodySchema.parse(req.body)

  const authenticateOrgService = makeAuthenticateOrgService()

  try {
    const { organization } = await authenticateOrgService.execute(body)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
          expiresIn: '1d',
        },
      },
    )

    return reply.status(201).send({ token })
  } catch (err) {
    if (err instanceof InvalidDataError) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
