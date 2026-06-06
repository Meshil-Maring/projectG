import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { HomePageProvider } from './context/HomePageContext.tsx'
import { GroupActivitiesProvider } from './context/GroupActivitiesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HomePageProvider>
        <GroupActivitiesProvider>
          <App />
        </GroupActivitiesProvider>
      </HomePageProvider>
    </BrowserRouter>
  </StrictMode>,
)
