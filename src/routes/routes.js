import avgValuesTable from "../pages/AvgValuesTable";
import Forecast from "../pages/Forecast";
import ImportedDataTable from "../pages/ImportedDataTable";
import Recalc from "../pages/Recalc";
import StartWindow from "../pages/StartWindow";

export const routes = [
    {
        path: '/',
        Element: StartWindow
    },
    {
        path: '/importData',
        Element: ImportedDataTable
    },
    {
        path: '/avgValues',
        Element: avgValuesTable
    },
    {
        path: '/recalc',
        Element: Recalc
    },
    {
        path: '/forecast',
        Element: Forecast
    }
]