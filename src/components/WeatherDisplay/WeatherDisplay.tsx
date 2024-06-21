import React, { FC, useState } from 'react';
import { RootState } from '../../redux';

import 'react-datepicker/dist/react-datepicker.css';

import css from './weatherDisplay.module.css';
import {useAppSelector} from "../../hooks";

const WeatherDisplay: FC = () => {
    const weather = useAppSelector((state: RootState) => state.weatherSlice);


    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const currentDate = selectedDate || new Date();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[currentDate.getDay()];

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    return (

            <div className={css.container} >

                {weather.loading ? (
                    <div>Loading...</div>
                ) : weather.error ? (
                    <div>Error: {weather.error}</div>
                ) : !weather.data ? (
                    <div>No weather data available</div>
                ) : (
                    <>
                        <h3>{dayOfWeek}</h3>
                        <h3>{weather.data.temp}°C</h3>
                        <h3>{formattedDate}</h3>
                        <h3>{weather.data.description}</h3>
                    </>
                )}
            </div>


    );
};

export {WeatherDisplay};
