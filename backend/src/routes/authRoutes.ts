import { FastifyInstance } from 'fastify'
import { AppDataSource } from '../database'
import { User } from '../entities/User'
import hash from 'bcryptjs'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const { name, email, password } = request.body as any
    const userRepository = AppDataSource.getRepository(User)
    const passwordHash = await hash.hash(password, 8)
    
    const user = userRepository.create({
      name,
      email,
      password: passwordHash
    })

    await userRepository.save(user)
    return reply.status(201).send({ message: "usuario criado" })
  })
}
