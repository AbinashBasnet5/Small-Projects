import { useEffect } from 'react';
import {useState, useState} from 'react';

// created a empty string to tore the response from the API and update the state with the response.
const currencyInfo = (currency) => {
    let url = `https://cdn.jsdeliver.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`;
    const [data, setData] = useState({});
    // triggers everytime when  the currency changes and fetches the data from the API.
useEffect(() =>{
    fetch(url)
    .then((res) => res.json())
    .then((res) => setData(res));
    console.log(data);
}, [currency]);
// returns the data from the API.
return data;
}
export default currencyInfo;