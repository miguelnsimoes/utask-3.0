import { DataSource } from 'typeorm'
import { User } from './entities/User'
import { Card } from './entities/Card'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '2275',
    database: 'utask_db',
    synchronize: true,
    logging: true,
    entities: [User, Card],
    
})  