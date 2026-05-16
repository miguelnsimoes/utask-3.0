import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Kanban } from './pages/Kanban'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/kanban" element={<Kanban />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App