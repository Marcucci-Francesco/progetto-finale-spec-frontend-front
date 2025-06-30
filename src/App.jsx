import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from './context/GlobalContext';
import DefaultLayout from './Layouts/DefaultLayout';
import DetailsPage from './Pages/DetailsPage';
import GaragePage from './Pages/GaragePage';
import ComparePage from './Pages/ComparePage';

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars/:id" element={<DetailsPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App