import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import weatherSlice from "./slice/weatherSlice";



let rootReducer = combineReducers({
    weatherSlice,
});
let setupStore = () => configureStore({
    reducer: rootReducer,
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type{
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}
