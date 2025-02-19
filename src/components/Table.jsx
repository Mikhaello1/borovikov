import { memo } from "react";
import MathModel from "./MathModel";
import styles from "../styles/ImportedDataTable.module.css"

export const Table = memo(({ averages, factorName, factorData, setMathModelValue }) => {
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>{factorName} </th>
                        <th className={styles.th}>Y-параметр</th>
                    </tr>
                </thead>
                <tbody>
                    {averages.map((value, index) => {
                        return <TableRow key={index} FValue={factorData[index]} YValue={value} />;
                    })}
                </tbody>
            </table>
            <MathModel xValues={factorData} yValues={averages} factorName={factorName} setMathModelValue={setMathModelValue}/>
        </>
    );
});

const TableRow = memo(({ FValue, YValue }) => {
    return (
        <tr>
            <td className={styles.td}>{FValue}</td>
            <td className={styles.td}>{YValue}</td>
        </tr>
    );
});