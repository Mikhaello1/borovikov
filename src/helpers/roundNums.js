

export default function roundNums(arr){

    return arr.map(row => {
        console.log(row)
        return row.map(el => {
            console.log(el)
            if(+el % 1 == 0) return +el
            else return (+el).toFixed(2)
        })
        
    });
}