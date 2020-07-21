import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '67bad249aac5e764c2a10d069b167480';


export const fetchWeather = async (city) => {
    return await axios.get(URL, {
        params: {
            q: city,
            units:'metric',
            appid: API_KEY
        }
    }).then(res => res.data);
}