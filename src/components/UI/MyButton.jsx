import styles from "../../styles/MyButton.module.css"

export default function MyButton({text, onClick, disabled, style}){

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={style}
            className={styles.MyButton}>
            {text}
        </button>
    )
}