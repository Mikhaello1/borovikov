import { memo } from "react";
import styles from "../styles/Table.module.css"

export const Table = memo(({ averages, columnNames, columnEI, factorData, numColumnAmount, condition }) => {

    return (
        <>
            <table className={styles.table} style={{width: "100%", height: "100%"}}>
                <thead>
                    <tr>
                        {numColumnAmount && <th>Номер экземпляра контрольной выборки</th>}
                        <th style={{fontSize: "16px"}} className={styles.th}>Значение {columnNames[0]}, {columnEI[0] || "??"} </th>
                        <th style={{fontSize: "16px"}} className={styles.th}>Среднее значение параметра {columnNames[1]} <br/>экземпляров обучающей выборки, {columnEI[1] ?? "??"}</th>
                    </tr>
                </thead>
                <tbody>
                    {averages.map((value, index) => {
                        return <TableRow key={index} FValue={factorData[index]} YValue={value} numOfInstance={numColumnAmount ? index+1 : undefined} condition={condition}/>;
                    })}
                </tbody>
            </table>
            
        </>
    );
});

const TableRow = memo(({ FValue, YValue, numOfInstance, condition }) => {
    
    return (
        <tr>
            {numOfInstance ? <td className={styles.td}>{numOfInstance}</td> : null}
            <td className={styles.td}>{FValue}</td>
            
            <td className={styles.td} style={condition ? condition(YValue) ? {color: '#01aa12'} : {color: 'red'} : null}>{YValue}</td>
        </tr>
    );
});