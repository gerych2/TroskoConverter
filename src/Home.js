import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="container">
            <h1 className="title">Добро пожаловать в конвертер валют</h1>
            <nav className="nav">
                <Link className="link-styled" to="/converter">Перейти к Конвертеру</Link>
                <Link className="link-styled" to="/rates">Посмотреть Курсы</Link>
            </nav>
        </div>
    );
};

export default Home;
