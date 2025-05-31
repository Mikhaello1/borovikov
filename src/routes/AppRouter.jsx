import { BrowserRouter, Routes, Route, HashRouter } from "react-router";
import { routes } from "./routes";
import NavBar from "../components/UI/NavBar";
import StepBar from "../components/UI/StepBar";

export default function AppRouter() {
    return (
        <HashRouter>
            <NavBar/>
            <Routes>
                {routes.map(({ path, Element }) => {
                    return <Route key={path} path={path} element={<Element />} />;
                })}
            </Routes>
        </HashRouter>
    );
}
