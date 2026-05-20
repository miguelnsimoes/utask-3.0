# uTask 3.0

Sistema de gerenciamento de tarefas no formato Kanban, com autenticação de usuários e interface moderna com suporte a dark mode.

---

## 📋 Sobre o Projeto

O uTask 3.0 é uma aplicação web fullstack de quadro Kanban onde cada usuário pode gerenciar suas próprias tarefas de forma organizada. O sistema conta com autenticação segura via JWT, permitindo que cada usuário acesse apenas seus próprios cards.

---

## ✨ Funcionalidades

- 🔐 Cadastro e login de usuários com autenticação JWT
- 🗂️ Quadro Kanban com três colunas: **A fazer**, **Em andamento** e **Feito**
- 🃏 CRUD completo de cards (criar, visualizar, editar e deletar)
- 💡 Frase do dia traduzida automaticamente via integração com APIs externas
- 🌙 Alternância entre dark mode e light mode
- 📱 Layout responsivo

---

## 🚀 Tecnologias

### Frontend
- [React](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)

### Backend
- [Node.js](https://nodejs.org/) com [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) para autenticação
- [Bcrypt](https://www.npmjs.com/package/bcryptjs) para hash de senhas

---

## 🗂️ Estrutura do Projeto

```
utask-3.0/
├── frontend/          # Aplicação React + Vite
│   └── src/
│       ├── pages/         # Telas (Login, Cadastro, Kanban)
│       ├── components/    # Componentes reutilizáveis
│       ├── context/       # Context API (dark mode)
│       └── services/      # Integração com a API
│
└── backend/           # API REST com Fastify
    └── src/
        ├── entities/      # Entidades do banco (User, Card)
        ├── routes/        # Rotas da API
        └── middlewares/   # Autenticação JWT
```

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js
- PostgreSQL

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

> Crie um banco de dados PostgreSQL chamado `utask_db` e configure as credenciais no arquivo `backend/src/database.ts`.

---

## 📌 Status das Funcionalidades

| Funcionalidade | Status |
|---|---|
| Tela de Login | ✅ Concluído |
| Tela de Cadastro | ✅ Concluído |
| Rotas de autenticação (JWT) | ✅ Concluído |
| CRUD de cards | ✅ Concluído |
| Tela Kanban | ✅ Concluído |
| Dark Mode | ✅ Concluído |
| Frase do dia | ✅ Concluído |
| Responsividade | ✅ Concluído |

---

## 👨‍💻 Autor

Feito por **Miguel Simões**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://linkedin.com/in/miguelnsimoes)
[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/miguelnsimoes)


