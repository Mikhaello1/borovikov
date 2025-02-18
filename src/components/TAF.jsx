import calcTAF from "../helpers/calcTAF";
import { memo, useCallback, useState } from "react";
import styles from "../styles/TAF.module.css";
import MyInput from "./UI/MyInput";

function TAF() {
    const [Uw, setUw] = useState(0);
    const [Ua, setUa] = useState(0);
    const [Tw, setTw] = useState(0);
    const [Ta, setTa] = useState(0);
    const [beta, setBeta] = useState(0);

    const [K, setK] = useState(0);

    return (
        <div>
            <div className={styles.TAF}>
                <div className={styles.gridCage}>
                    <h4>Tw = </h4>
                    <MyInput className={styles.input} value={Uw} onChange={useCallback((e) => setUw(e.currentTarget.value))} />
                </div>
                <div className={styles.gridCage}>
                    <h4>Ta = </h4>

                    <MyInput className={styles.input} value={Ua} onChange={useCallback((e) => setUa(e.currentTarget.value))} />
                </div>
                <div className={styles.gridCage}>
                    <h4>Uw = </h4>

                    <MyInput className={styles.input} value={Tw} onChange={useCallback((e) => setTw(e.currentTarget.value))} />
                </div>
                <div className={styles.gridCage}>
                    <h4>Ua = </h4>

                    <MyInput className={styles.input} value={Ta} onChange={useCallback((e) => setTa(e.currentTarget.value))} />
                </div>
                <div className={styles.gridCage}>
                    <h4>beta = </h4>

                    <MyInput className={styles.input} value={beta} onChange={useCallback((e) => setBeta(e.currentTarget.value))} />
                </div>
            </div>
            <button style={{ marginBottom: "10px" }} onClick={useCallback(() => setK(calcTAF(Tw, Ta, Uw, Ua, beta)), [Tw, Ta, Uw, Ua, beta])}>
                Calc K
            </button>
            <br />K = {K}
        </div>
    );
}


export default memo(TAF)