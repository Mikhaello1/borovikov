import App from "../App";
import avgValuesTable from "../pages/AvgValuesTable";
import ImportedDataTable from "../pages/ImportedDataTable";
import Recalc from "../pages/Recalc";

export const routes = [
    {
        path: '/',
        Element: ImportedDataTable
    },
    {
        path: '/avgValues',
        Element: avgValuesTable
    },
    {
        path: '/recalc',
        Element: Recalc
    }
]