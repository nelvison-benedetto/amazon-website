import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GlobalProvider from './contexts/GlobalProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'  //da react-router-dom not react-router!
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}>
              <Route path='/' element={<HomePage/>} />
              <Route path='/auth' element={<AuthPage/>} />
              <Route path='*' element={<NotFoundPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
