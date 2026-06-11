import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { HomePageProvider } from './context/HomePageContext.tsx'
import { GroupActivitiesProvider } from './context/GroupActivitiesContext.tsx'
import { TeamProvider } from './context/TeamContext.tsx'
import { AboutUsProvider } from './context/AboutUsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HomePageProvider>
        <AboutUsProvider>
          <GroupActivitiesProvider>
            <TeamProvider>
              <App />
            </TeamProvider>
          </GroupActivitiesProvider>
        </AboutUsProvider>
      </HomePageProvider>
    </BrowserRouter>
  </StrictMode>,
)
