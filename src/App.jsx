import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">p198</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/about">About</Link>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div>
      <h1>Chiara's Web Project</h1>
      <p>Welcome to my web project!</p>
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>This is my p198 project.</p>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  )
}

function App() {
  return <Layout />
}

export default App
