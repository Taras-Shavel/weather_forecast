import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { IDataResolved } from '../../interfaces';
import { Day } from '../Day';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './weatherForecast.module.css';
import {RootState} from "../../redux";
import {useAppSelector} from "../../hooks";

interface IProps {
    city: string;
}

const WeatherForecast: FC<IProps> = ({ city }) => {
    const weather = useAppSelector((state: RootState) => state.weatherSlice);
    const apiKey = 'EK3HRZPS6M6JZZF4PWAZN5DPQ';
    const unitGroup = 'metric';

    const [forecastData, setForecastData] = useState<IDataResolved | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        city
    )}?unitGroup=${unitGroup}&key=${apiKey}`;

    const fetchWeatherForecast = async () => {
        try {
            const response = await axios.get<IDataResolved>(apiUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    };

    useEffect(() => {
        const getWeatherData = async () => {
            const data = await fetchWeatherForecast();
            if (data) {
                setForecastData(data);
            }
        };

        getWeatherData();
    }, []);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    if (!forecastData) {
        return <div>Please enter your city...</div>;
    }

    let filteredDays = forecastData.days;

    if (selectedDate) {
        filteredDays = forecastData.days.filter(
            (day) => new Date(day.datetime).toLocaleDateString() === selectedDate.toLocaleDateString()
        );
    }


    console.log(weather)
    return (
        <div style={{width: '950px'}}>
            <h2>Weather Forecast for {forecastData.resolvedAddress}</h2>
            <div className={css.datePickerContainer}>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    className={css.datePickerInput}
                />
            </div>
            <div className={css.container}>
                {filteredDays.slice(0, 14).map((day) => (
                    <Day day={day} key={day.datetime}/>
                ))}
            </div>
        </div>
    );
};

export {WeatherForecast};
