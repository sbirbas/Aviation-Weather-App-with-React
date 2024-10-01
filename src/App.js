import React, { useEffect } from 'react';
import WeatherComponent from './weathersearch';
import './App.css';
import {gsapAnimation} from "./gsap";

const App = () => {
    useEffect(() => {
        gsapAnimation();
    }, []);

    return (
        <div className="App">
            <WeatherComponent />
        </div>
    );
};

export default App;

