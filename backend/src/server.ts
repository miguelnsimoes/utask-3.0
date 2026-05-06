import Fastify from 'fastify'
import { AppDataSource } from './database'
import fastifyJwt from '@fastify/jwt'
import { authRoutes } from './routes/authRoutes'
import { cardRoutes } from './routes/cardRoutes'
import cors from '@fastify/cors' 

const app = Fastify()

app.register(cors, {
    origin: 'http://localhost:5173',
})

app.register(fastifyJwt, {
    secret: 'asdjasdjakjdlaksjdlasd'
})

app.register(authRoutes, { prefix: '/auth' })
app.register(cardRoutes, { prefix: '/cards' })

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