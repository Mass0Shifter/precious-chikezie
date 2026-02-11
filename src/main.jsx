import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import PetProjectsPage from './pages/PetProjectsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/pet-projects" element={<PetProjectsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
