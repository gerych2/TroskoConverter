import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Converter.css';

const Converter = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [rate, setRate] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get(
                    `https://v6.exchangerate-api.com/v6/52f90c12388244d54d781185/latest/USD`
                );
                setCurrencies(Object.keys(response.data.conversion_rates));
            } catch (error) {
                console.error("Не удалось загрузить валюты:", error);
            }
        };

        fetchCurrencies();
    }, []);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const response = await axios.get(
                    `https://v6.exchangerate-api.com/v6/52f90c12388244d54d781185/latest/${baseCurrency}`
                );
                setRate(response.data.conversion_rates[targetCurrency]);
            } catch (error) {
                console.error("Не удалось загрузить курс:", error);
            }
        };

        fetchRate();
    }, [baseCurrency, targetCurrency]);

    const handleConvert = () => {
        const converted = amount * rate;
        setConvertedAmount(converted);
    };

    return (
        <div className="container">
            <h2 style={{color: '#2c3e50'}}>Конвертер</h2>
            <input
                type="number"
                className="input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Сумма"
            />
            <select className="select" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <span style={{color: '#2c3e50'}}>в</span>
            <select className="select" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <button className="button" onClick={handleConvert}>Конвертировать</button>
            {convertedAmount !== null && (
                <div className="result">
                    {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
                </div>
            )}
        </div>
    );
};

export default Converter;