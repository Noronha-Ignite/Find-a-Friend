import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetchPets } from './fetch-pets'

export const petsRoutes = async (app: FastifyInstance) => {
  app.get('/pets/city/:city', fetchPets)

  app.post('/orgs/:orgId/pets', create)
}
