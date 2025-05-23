import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('Starting ADHD Task Manager...')

const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (rootElement) {
  try {
    const root = createRoot(rootElement)
    console.log('Root created successfully')
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    console.log('App rendered successfully')
  } catch (error) {
    console.error('Error rendering app:', error)
    rootElement.innerHTML = '<h1>Error loading ADHD Task Manager</h1><p>Check console for details</p>'
  }
} else {
  console.error('Root element not found!')
  document.body.innerHTML = '<h1>Error: Root element not found</h1>'
}
