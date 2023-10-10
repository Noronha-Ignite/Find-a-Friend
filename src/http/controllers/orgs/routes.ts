import { FastifyInstance } from 'fastify'

import { create } from './create'

export const orgsRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', create)
}
