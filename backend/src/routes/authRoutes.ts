import { FastifyInstance } from 'fastify'
import { AppDataSource } from '../database'
import { User } from '../entities/User'
import hash from 'bcryptjs'

export async function authRoutes(app: FastifyInstance) {
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


  app.post('/login', async (request, reply) => {
    const { email, password } = request.body as any
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ email })

    if (!user) {
      return reply.status(401).send({ message: "Email incorreto" })
    }

    const passwordMatch = await hash.compare(password, user.password)

    if (!passwordMatch) {
      return reply.status(401).send({ message: "Senha incorreta" })
    }

    const token = app.jwt.sign(
      { name: user.name }, 
      { sub: String(user.id), expiresIn: '7d' }
    )

    return { token }
    
})
}
