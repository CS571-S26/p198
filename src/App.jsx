import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { Button } from 'react-bootstrap'

function App() {
  const [count, setCount] = useState(0)

   return (
      <div className="container mt-4">
        <h1>Chiara's Web Project</h1>
        <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      </div>
    )
}

export default App
