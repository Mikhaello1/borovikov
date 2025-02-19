export default function roundNum(el){
    if(typeof el == 'string') el = +el
    if(el % 1 == 0) return el
    else return (el).toFixed(2)
}