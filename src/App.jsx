import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GlobalProvider from './contexts/GlobalProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'  //da react-router-dom not react-router!
import Layout from './layouts/Layout'
import Layout2 from './layouts/Layout2'
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
            </Route>
            <Route element={<Layout2/>}>
              <Route path='*' element={<NotFoundPage/>} />
            </Route>

            <Route path='/auth' element={<AuthPage/>} />

          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
