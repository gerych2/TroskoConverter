import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Converter from './components/Converter';
import Rates from './components/Rates';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <header className="header">Конвертер валют</header>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/converter" element={<Converter />} />
                    <Route path="/rates" element={<Rates />} />
                </Routes>
            </Router>
            <footer className="footer">
                Data provided by ExchangeRate API | © 2024 Currency Converter
            </footer>
        </div>
    );
}

export default App;
