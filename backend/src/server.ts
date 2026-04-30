import Fastify from 'fastify'
import { AppDataSource } from './database'
import fastifyJwt from '@fastify/jwt'
import { authRoutes } from './routes/authRoutes'

const app = Fastify()

app.register(fastifyJwt, {
    secret: 'asdjasdjakjdlaksjdlasd'
})

app.register(authRoutes)

const start = async () => {
    try {
    await AppDataSource.initialize()
    await app.listen({ port: 3333 })
    console.log("rodando")
  }
   catch (err) {
    console.error(err)
  }
}

start()