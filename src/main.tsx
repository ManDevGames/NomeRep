import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from '@/context/LanguageProvider'
import { ThemeProvider } from '@/context/ThemeProvider'
import { CurrencyProvider } from '@/context/CurrencyProvider'
import { captureUtm } from '@/lib/utm'
import './index.css'

captureUtm()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <App />
          </CurrencyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
