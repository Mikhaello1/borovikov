import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    avgRoute: false,
    recalcRoute: false,
    forecastRoute: false
}

const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {
        setAvgRouteAvailable: (state, action) => {
            state.avgRoute = action.payload;

        },
        setRecalcRouteAvailable: (state, action) => {

            state.recalcRoute = action.payload;

        },
        setForecastRouteAvailable: (state, action) => {

            state.forecastRoute = action.payload;
        }
    }
})

export const { setAvgRouteAvailable, setForecastRouteAvailable, setRecalcRouteAvailable } = routesSlice.actions;
export default routesSlice.reducer;