import React from 'react';

import css from './weatherForecast.module.css'
import {WeatherDisplay, WeatherSearch} from "../components";

const WeatherForecastPage = () => {

    return (
        <div className={css.container}>
            <WeatherSearch />
            <WeatherDisplay />
        </div>
    );
};

export {WeatherForecastPage};