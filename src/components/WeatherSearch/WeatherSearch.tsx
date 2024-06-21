import React, { FC, useState } from 'react';
import { fetchWeather } from '../../redux';
import { useAppDispatch } from '../../hooks';
import css from './weatherSearch.module.css';
import { WeatherForecast } from '../WeatherForecast';

const WeatherSearch: FC = () => {
    const [inputCity, setInputCity] = useState<string>('');
    const [searchKey, setSearchKey] = useState<number>(0);
    const dispatch = useAppDispatch();

    const handleSearch = () => {
        setSearchKey(prevKey => prevKey + 1);
        dispatch(fetchWeather(inputCity));
    };

    return (
        <div className={css.container}>
            <h1>Weather Forecast</h1>
            <div style={{display: 'flex'}}>
                <input
                    type="text"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                    placeholder="Enter city"
                    className={css.Input}
                />
                <button
                    onClick={handleSearch}
                    className={css.Button}

                >
                    Search
                </button>
            </div>

            <WeatherForecast key={searchKey} city={inputCity}/>
        </div>
    );
};

export {WeatherSearch};
