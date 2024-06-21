import {IDayForecast} from "./DayForecast.interface";

export interface IDataResolved {
    resolvedAddress: string;
    days: IDayForecast[];
}