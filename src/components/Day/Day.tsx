import React, {FC} from 'react';
import {IDayForecast} from "../../interfaces";
import css from './day.module.css'

interface IProps {
    day: IDayForecast;
}

const Day: FC<IProps> = ({day}) => {
    const {datetime, temp, tempmax, tempmin, conditions} = day
    return (
        <div className={css.container}>
            <div>{datetime}</div>
            <div>{conditions}</div>
            <div>Temp: {temp}</div>
            <div>Min: {tempmin}</div>
            <div>Max: {tempmax}</div>
        </div>
    );
};

export {Day};