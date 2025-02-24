import { memo } from "react";
import styles from "../styles/Table.module.css"

export const Table = memo(({ averages, columnNames, factorData, numColumnAmount }) => {
//               зн-я второй колонки, подпись колонок, зн-я первой колонки, количество строчек
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {numColumnAmount && <th>Номер экземпляра контрольной выборки</th>}
                        <th className={styles.th}>{columnNames[0]} </th>
                        <th className={styles.th}>{columnNames[1]}</th>
                    </tr>
                </thead>
                <tbody>
                    {averages.map((value, index) => {
                        return <TableRow key={index} FValue={factorData[index]} YValue={value} numOfInstance={numColumnAmount ? index+1 : undefined}/>;
                    })}
                </tbody>
            </table>
            
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