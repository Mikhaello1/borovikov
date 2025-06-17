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
        },
        clearRoutes: (state, action) => {
            
            state.recalcRoute = false;
            state.forecastRoute = false;
        }
    }
})

export const { setAvgRouteAvailable, setForecastRouteAvailable, setRecalcRouteAvailable, clearRoutes } = routesSlice.actions;
export default routesSlice.reducer;