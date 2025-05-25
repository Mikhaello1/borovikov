import { NavLink, useLocation, useNavigate } from "react-router";
import styles from "../../styles/NavBar.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PiArrowCircleRightBold } from "react-icons/pi";

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

    const navigationLinks = [
        { path: "/", label: "Ввод данных", isAvailable: true, hasNext: true },
        { path: "/avgValues", label: "Средние значения", isAvailable: avgRoute, hasNext: true },
        { path: "/recalc", label: "Имитационная модель", isAvailable: recalcRoute, hasNext: true },
        { path: "/forecast", label: "Прогнозирование ошибок", isAvailable: forecastRoute, hasNext: false },
    ];

    const getRouteStyle = (path) => {
        if (location.pathname === path) return styles.currentRoute;
        return navigationLinks.find(route => route.path === path && route.isAvailable) ? styles.availableRoute : styles.unavailableRoute;
    };

    return (
        <nav className={styles.NavBar} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {navigationLinks.map(({ path, label, isAvailable, hasNext }) => (
                <div key={path} style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', position:'relative' }}>
                    {isAvailable ? (
                        <NavLink className={getRouteStyle(path)} to={path}>
                            {label}
                        </NavLink>
                    ) : (
                        <span className={styles.unavailableRoute}>
                            {label}
                        </span>
                    )}
                    {hasNext && <PiArrowCircleRightBold size={40} color="white" style={{ position: 'absolute', right: -20 }} />}
                </div>
            ))}
        </nav>
    );
}