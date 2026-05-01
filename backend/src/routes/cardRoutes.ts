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

    app.put('/cards/:id', async(request, reply)=>{
        const {id} = request.params as {id: string}
        const {title, description, column} = request.body as any
        const userId = request.user.sub
        const cardRepository = AppDataSource.getRepository(Card)

        const card = await cardRepository.findOneBy({
            id: Number(id),
            user: {id: Number(userId)}
        })  

        if(!card){
            return reply.status(404).send({message: "Card não encontrado"})
        }

        card.title = title ?? card.title
        card.description = description ?? card.description
        card.column = column ?? card.column

        await cardRepository.save(card)
        return card

        


    })

}