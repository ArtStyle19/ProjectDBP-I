import { Maps, Incidencia, Lista } from './components';
import { Wrapper } from '@googlemaps/react-wrapper';


import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'

import { app } from "./firebase/firebaseConfig";
import React, { useEffect } from "react";


function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="navbar-brand">Mapa</Link>
            </li>
            <li className="nav-item">
              <Link to="/Incidencia" className="navbar-brand">Incidencia</Link>
            </li>
            <li className="nav-item">
              <Link to="/Lista" className="navbar-brand">Lista</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div style={{ border: '2px solid blue', display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh' }}>
        <Routes>
          <Route path="/" element={<div style={{ border: '2px solid red', width: '100%', height: '100%' }}>
            <Maps />
          </div>} />
          <Route path="/Incidencia" element={<div style={{ width: '100vw' }}>
            <Incidencia />
          </div>} />
          <Route path="/Lista" element={<div style={{  width: '100vw' }}>
            <Lista/>
          </div>} />
        </Routes>
      </div>

    </BrowserRouter>
  )
}

export default App
