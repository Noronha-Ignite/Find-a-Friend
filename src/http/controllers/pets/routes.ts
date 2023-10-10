import { FastifyInstance } from 'fastify'
import { create } from './create'

export const petsRoutes = async (app: FastifyInstance) => {
  app.post('/orgs/:orgId/pets', create)
}
