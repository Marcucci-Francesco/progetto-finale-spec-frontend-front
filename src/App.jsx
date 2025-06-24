import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from './context/GlobalContext';
import DefaultLayout from './Layouts/DefaultLayout';

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App