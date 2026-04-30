import Fastify from 'fastify'
import { AppDataSource } from './database'

const app = Fastify()

const start = async () => {
    try {
        await AppDataSource.initialize()
        console.log("banco conectado")

        await app.listen({ port: 3333 })
        console.log("servidor rodando")
    } 
    catch (err) {
        console.error("nao conectou, erro: ", err)
        process.exit(1)
    }
}

start()