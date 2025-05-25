import { memo, useCallback } from "react"
import styles from "../../styles/StepBar.module.css"
import { useNavigate } from "react-router"

const StepBar = ({backRoute, nextRoute, backAction, nextAction, backDisabled, nextDisabled}) => {

    const navigate = useNavigate();

    const handleBack = useCallback(() => {
        if(typeof backAction === 'function') backAction();
        navigate(backRoute)
    }, [backRoute])

    const handleNext = useCallback(() => {
        if(typeof nextAction === 'function') nextAction();
        navigate(nextRoute)
    }, [nextRoute])

    return (
        <div disabled={!backRoute} className={styles.stepBar}>
            <button disabled={!backRoute || backDisabled} className={styles.arrow} onClick={handleBack}>
                <div className={styles.arrowLeft}>Назад</div>
            </button>
            <button disabled={!nextRoute || nextDisabled} className={styles.arrow} onClick={handleNext}>
                <div className={styles.arrowRight}>Вперёд</div>
            </button>
        </div>
    )
    
}

export default memo(StepBar);