import { FastifyInstance } from 'fastify'
import { authMiddleware } from '../middlewares/authMiddleware'
import { AppDataSource } from '../database'
import { Card } from '../entities/Card'

export async function cardRoutes(app: FastifyInstance){
    app.addHook('preHandler', authMiddleware)
}