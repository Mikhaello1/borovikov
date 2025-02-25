import { NavLink, useLocation, useNavigate } from "react-router";
import styles from "../../styles/NavBar.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function NavBar() {
    const { avgRoute, recalcRoute, forecastRoute } = useSelector((state) => state.routes);
    const [hasRedirected, setHasRedirected] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasRedirected) {
            navigate("/");
            setHasRedirected(true);
        }
    }, [hasRedirected, navigate]);

    const routes = [
        { path: "/", label: "Ввод данных", isAvailable: true },
        { path: "/avgValues", label: "Средние значения", isAvailable: avgRoute },
        { path: "/recalc", label: "Значения пересчёта", isAvailable: recalcRoute },
        { path: "/forecast", label: "Прогнозирование ошибок", isAvailable: forecastRoute },
    ];

    const getRouteStyle = (path) => {
        if (location.pathname === path) return styles.currentRoute;
        return routes.find(route => route.path === path && route.isAvailable) ? styles.availableRoute : styles.unavailableRoute;
    };

    return (
        <nav className={styles.NavBar}>
            {routes.map(({ path, label, isAvailable }) => (
                isAvailable ? (
                    <NavLink key={path} className={getRouteStyle(path)} to={path}>
                        {label}
                    </NavLink>
                ) : (
                    <span key={path} className={styles.unavailableRoute}>
                        {label}
                    </span>
                )
            ))}
        </nav>
    );
}