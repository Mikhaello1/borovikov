import { memo } from "react";
import MathModel from "./MathModel";
import styles from "../styles/ImportedDataTable.module.css"

export const Table = memo(({ averages, factorName, factorData, setMathModelValue, numColumnAmount }) => {
//               зн-я второй колонки, подпись колонки, зн-я первой колонки, убрать хуйню, количество строчек
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {numColumnAmount && <th>Номер экземпляра контрольной выборки</th>}
                        <th className={styles.th}>{factorName} </th>
                        <th className={styles.th}>Y-параметр</th>
                    </tr>
                </thead>
                <tbody>
                    {averages.map((value, index) => {
                        return <TableRow key={index} FValue={factorData[index]} YValue={value} numOfInstance={numColumnAmount ? index+1 : undefined}/>;
                    })}
                </tbody>
            </table>
            <MathModel xValues={factorData} yValues={averages} factorName={factorName} setMathModelValue={setMathModelValue}/>
        </>
    );
});

const TableRow = memo(({ FValue, YValue, numOfInstance }) => {
    
    return (
        <tr>
            {numOfInstance ? <td className={styles.td}>{numOfInstance}</td> : null}
            <td className={styles.td}>{FValue}</td>
            <td className={styles.td}>{YValue}</td>
        </tr>
    );
});