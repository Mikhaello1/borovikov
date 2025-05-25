import { BrowserRouter, Routes, Route } from "react-router";
import { routes } from "./routes";
import NavBar from "../components/UI/NavBar";
import StepBar from "../components/UI/StepBar";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                {routes.map(({ path, Element }) => {
                    return <Route key={path} path={path} element={<Element />} />;
                })}
            </Routes>
        </BrowserRouter>
    );
}
