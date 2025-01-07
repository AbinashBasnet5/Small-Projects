import { useState, useEffect } from 'react';
import './App.css';
import Input from './assets/Components/Input';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('NPR');
  const [to, setTo] = useState('USD');
  const [currency, setCurrency] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/' + from);
        const data = await response.json();
        setCurrency(data.rates);
        setOptions(Object.keys(data.rates));
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencyData();
  }, [from,to]);
  const converted = amount * (currency[to] || 1);


  return (
    <>
      <h1 className="bg-blue-700 font-mono text-center py-4 px-6 my-5 text-white text-4xl font-bold rounded-lg">Currency Converter</h1>
      <Input
        currencyOptions={options}
        amount={amount}
        onChange={(value) => setAmount(Number(value))}
        selectedCurrency={from}
        onCurrencyChange={(value) => setFrom(value)}
      />
      <Input
        currencyOptions={options}
        amount={converted}
        onChange={(value) => setAmount(Number(value) / (currency[to] || 1))}
        selectedCurrency={to}
        onCurrencyChange={(value) => setTo(value)}
      />
    </>
  );
}

export default App;
