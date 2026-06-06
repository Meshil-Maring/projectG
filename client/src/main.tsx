import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { HomePageProvider } from './context/HomePageContext.tsx'
import { GroupActivitiesProvider } from './context/GroupActivitiesContext.tsx'
import { TeamProvider } from './context/TeamContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HomePageProvider>
        <GroupActivitiesProvider>
          <TeamProvider>
            <App />
          </TeamProvider>
        </GroupActivitiesProvider>
      </HomePageProvider>
    </BrowserRouter>
  </StrictMode>,
)
