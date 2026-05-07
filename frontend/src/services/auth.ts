import { api } from './api';

export async function registerUser(username: string, email: string, password: string) {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
}

export async function loginUser(email: string, password: string){
    try{
        const response = await api.post('/auth/login', {email, password});
        return response.data;
    }
    catch(err: any) {
        throw new Error(err.response?.data?.message ?? 'Erro ao fazer login.')
    }
}