import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { HomePageProvider } from './context/HomePageContext.tsx'
import { NoticeProvider } from './context/NoticeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HomePageProvider>
        <NoticeProvider>
          <App />
        </NoticeProvider>
      </HomePageProvider>
    </BrowserRouter>
  </StrictMode>,
)
