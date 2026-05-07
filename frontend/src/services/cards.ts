import { api } from './api'

export interface Card{
    id: number
    title: string
    description: string
    column: string
}

export async function getCards(): Promise<Card[]>{
    const response = await api.get('/cards')
    return response.data
}

export async function createCard(title: string, description: string, column: string): Promise<Card> {
    const response = await api.post('/cards', { title, description, column })
    return response.data
}

export async function updateCard(id: number, data: Partial<Card>): Promise<Card> {
    const response = await api.put(`/cards/${id}`, data)
    return response.data
}

export async function deleteCard(id: number): Promise<void> {
    await api.delete(`/cards/${id}`)
}