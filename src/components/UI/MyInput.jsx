import { memo } from "react"
import styles from "../../styles/MyInput.module.css"

function MyInput({className, type, placeholder, pattern, min, max, onChange, value}) {
  return (
    <input 
        className={`${className} ${styles.MyInput}`}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        min={min}  
        max={max}
        onChange={(e) => onChange(e)} 
        value={value}
    />
  )
}

export default memo(MyInput)
