import React, { useState, useEffect, useRef } from 'react';
import places from 'places.js';
import { fetchWeather } from '../services/weatherService';
import { getPhoto } from '../services/imageService';

export default function WeatherApp() {
    const [location, setLocation] = useState();
    const [weatherData, setWeather] = useState();
    const [backgroundPhoto, setbackgroundPhoto] = useState();
    const [loading, setLoading] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        window.addEventListener('keyup', selectCity);
        window.addEventListener('click', selectCity);
        places({
            appId: location,
            apiKey: '#',
            container: inputRef.current,
            templates: {
                value: function (suggestion) {
                    return suggestion.name;
                }
            }
        }).configure({
            type: 'city',
            aroundLatLngViaIP: true,
            useDeviceLocation: true
        });
        return () => {
            window.removeEventListener('keyup', selectCity);
            window.removeEventListener('click', selectCity);
        }
    }, [])

    const selectCity = (e) => {
        if (e.which === 1 && e.path.some(el => el.className === 'ap-suggestions')) getWeather();
        else if (e.keyCode === 13 && e.target === inputRef.current) getWeather();
    }

    async function getWeather() {
        try {
            setLoading('isLoading')
            const data = await fetchWeather(inputRef.current.value)
            setWeather(data);
            inputRef.current.blur();
        } catch (err) {
            console.log(err)
            setWeather('Info unavailable')
        } finally {
            const url = await getPhoto(inputRef.current.value)
                .then(res => res.results[0]?.urls.full);
            setbackgroundPhoto(url);
            setLoading('');
            inputRef.current.value = '';
        }
    }



    return (
        <div className={`main-container ${loading}`} style={backgroundPhoto && { backgroundImage: `url(${backgroundPhoto})` }}>
            <div className="search-container">
                <input title="search" ref={inputRef} type="text" placeholder="Search Location" onChange={e => setLocation(e.target.value)} />
                <div className="weather-info-container">
                    {weatherData === 'Info unavailable' ? <div className="no-info fs30">{weatherData}</div> : <>
                        {weatherData &&
                            <div className="weather-wrapper flex column align-center space-around">
                                <h3 className="weather-city fs30">{weatherData.name} , <span className="weather-country fs20">{weatherData.sys.country}</span></h3>
                                <h2 className="weather-temp fs40">{Math.round(weatherData.main.temp)}<sup className="weather-deg fs20">&deg;C</sup></h2>
                                <img className="weather-icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="#" />
                                <h3 className="weatehr-desc fs20">{weatherData.weather[0].description}</h3>
                            </div>}
                    </>}
                </div>
            </div>
        </div>
    )
}