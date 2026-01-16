import { StrictMode } from 'react' // el strictmode sirve para detectar problemas en la aplicacion
import { createRoot } from 'react-dom/client' // createRoot es la nueva forma de renderizar en react 18
import './index.css'
import App from './App.jsx' // importamos el componente principal de la aplicacion

// renderizamos la aplicacion en el elemento con id 'root'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
