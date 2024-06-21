import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IWeatherData } from "../../interfaces";

interface WeatherState {
    data: IWeatherData | null;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city: string) => {
        try {
            const response = await axios.get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EK3HRZPS6M6JZZF4PWAZN5DPQ`
            );
            const data = response.data;

            console.log('API response:', data); // Log the API response for debugging

            return {
                temp: data.currentConditions.temp,
                description: data.currentConditions.conditions,
            };
        } catch (error) {
            console.error('Error fetching weather data:', error); // Log any error for debugging
            throw error;
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch weather';
            });
    },
});

export default weatherSlice.reducer;
