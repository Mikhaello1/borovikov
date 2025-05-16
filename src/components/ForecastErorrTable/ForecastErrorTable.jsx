import { memo } from "react";
import styles from "../../styles/Table.module.css";

export const ForecastErrorTable = memo(({ averages, columnNames, factorData, condition }) => {
    return (
        <>
            <table className={styles.table}>

                <tbody>
                    <tr>
                        <td style={{fontWeight: "bold"}} className={styles.td}>{columnNames[0]}</td>
                        {averages.map((value, index) => (
                            <td key={index} className={styles.td}>
                                {factorData[index]}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td style={{fontWeight: "bold"}} className={styles.td}>{columnNames[1]}</td>
                        {averages.map((value, index) => (
                            <td key={index} className={styles.td} style={condition ? condition(value) ? { color: '#01aa12' } : { color: 'red' } : null}>
                                {value}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    );
});