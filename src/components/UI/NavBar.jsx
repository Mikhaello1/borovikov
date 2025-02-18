import { NavLink } from "react-router";
import styles from '../../styles/NavBar.module.css'

export default function NavBar(){

    return (
        <nav className={styles.NavBar}>
            <NavLink to='/'>Ввод данных</NavLink>
            <NavLink to='/avgValues'>Средние значения</NavLink>
            <NavLink></NavLink>
            <NavLink></NavLink>
        </nav>
    )
}