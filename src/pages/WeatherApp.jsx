import React, { useState, useEffect } from 'react';

export default function WeatherApp(props) {
    const [location, setLocation] = useState();

    useEffect(() => {
        console.log('locationnnn')
    }, [location])

    function handleSubmit(e) {
        console.log(e);
        e.preventDefault()
    }


    return (
        <div className="main-container flex justify-center align-center">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search Location" onChange={e => setLocation(e.target.value)} />
            </form>
            <div className="suggestions">
            </div>
        </div>
    )
}