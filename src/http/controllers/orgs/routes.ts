import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { create } from './create'

export const orgsRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', create)
  app.post('/orgs/sessions', authenticate)
}
