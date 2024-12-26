import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Rates.css';

const Rates = () => {
    const [rates, setRates] = useState(() => {
        const savedRates = localStorage.getItem('rates');
        return savedRates ? JSON.parse(savedRates) : {};
    });
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [baseCurrency, setBaseCurrency] = useState(localStorage.getItem('baseCurrency') || 'USD');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://v6.exchangerate-api.com/v6/52f90c12388244d54d781185/latest/${baseCurrency}`
                );
                const newRates = response.data.conversion_rates;
                setRates(newRates);
                localStorage.setItem('rates', JSON.stringify(newRates));
                console.log('Курсы загружены и сохранены:', newRates);
            } catch (err) {
                console.error('Ошибка при загрузке курсов:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, [baseCurrency]);

    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log('Избранные валюты сохранены в localStorage:', favorites);
        } catch (err) {
            console.error('Ошибка при сохранении избранных валют в localStorage:', err);
        }
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('baseCurrency', baseCurrency);
        console.log('Базовая валюта сохранена в localStorage:', baseCurrency);
    }, [baseCurrency]);

    const toggleFavorite = (currency) => {
        if (favorites.includes(currency)) {
            setFavorites(favorites.filter((fav) => fav !== currency));
        } else {
            setFavorites([...favorites, currency]);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Курсы валют</h2>
                <div className="base-currency-container">
                    <label className="base-currency-label">Базовая валюта:</label>
                    <select className="select" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                {loading && <div className="loading">Загрузка...</div>}
                {error && <div className="error">Ошибка: {error}</div>}
                {!loading && !error && (
                    <ul className="list">
                        {favorites.length > 0 && (
                            <>
                                <h3>Избранные</h3>
                                {favorites.map((currency) => (
                                    <li className="list-item" key={currency}>
                                        <span>{currency}: {rates[currency]?.toFixed(4) || 'N/A'}</span>
                                        <button className="button" onClick={() => toggleFavorite(currency)}>Удалить</button>
                                    </li>
                                ))}
                            </>
                        )}
                        <h3>Все валюты</h3>
                        {Object.keys(rates)
                            .filter((currency) => !favorites.includes(currency))
                            .map((currency) => (
                                <li className="list-item" key={currency}>
                                    <span>{currency}: {rates[currency]?.toFixed(4) || 'N/A'}</span>
                                    <button className="button" onClick={() => toggleFavorite(currency)}>Добавить в избранные</button>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Rates;