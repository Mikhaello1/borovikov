import App from "../App";
import avgValuesTable from "../pages/AvgValuesTable";
import ImportedDataTable from "../pages/ImportedDataTable";

export const routes = [
    {
        path: '/',
        Element: ImportedDataTable
    },
    {
        path: '/avgValues',
        Element: avgValuesTable
    }
]