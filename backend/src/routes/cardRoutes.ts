import { FastifyInstance } from 'fastify'
import { authMiddleware } from '../middlewares/authMiddleware'
import { AppDataSource } from '../database'
import { Card } from '../entities/Card'

export async function cardRoutes(app: FastifyInstance){
    app.addHook('preHandler', authMiddleware)

    app.post('/cards', async (request, reply)=>{
        const {title, description, column} = request.body as any
        const userId = request.user.sub
        const cardRepository = AppDataSource.getRepository(Card)

        const card = cardRepository.create({
            title,
            description,
            column,
            user: {id: Number(userId)}
        })
        
        await cardRepository.save(card)
        return reply.status(201).send(card)

    })

    app.get('/cards', async (request)=>{
        const userId = request.user.sub
        const cardRepository = AppDataSource.getRepository(Card)

        return await cardRepository.findBy({
            user: {id: Number(userId)}
        })
    })

}