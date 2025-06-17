
import { routes } from "./routes";
import NavBar from "../components/UI/NavBar";
import { HashRouter, Route, Routes, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const MainLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем, был ли компонент уже загружен
        const isFirstLoad = sessionStorage.getItem('isFirstLoad');
        
        if (!isFirstLoad) {
            sessionStorage.setItem('isFirstLoad', 'true'); // Устанавливаем флаг
            navigate('/'); // Перенаправляем на '/'
        }
    }, [navigate]);
    

    return (
        <>
            {currentPath !== '/' ? <><NavBar /></> : null}
            <Routes>
                {routes.map(({ path, Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                ))}
            </Routes>
        </>
    );
};

export default function AppRouter() {
    return (
        <HashRouter>
            <MainLayout />
        </HashRouter>
    );
}