import { memo } from "react"
import styles from "../../styles/MyButton.module.css"

function MyButton({text, onClick, disabled, style, children}){

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={style}
            className={styles.MyButton}>
            {text || children}
        </button>
    )
}

export default memo(MyButton)