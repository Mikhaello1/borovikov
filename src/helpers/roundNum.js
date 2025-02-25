export default function roundNum(el){
    if(typeof el == 'string') el = Number(el)
    if(el % 1 == 0) return el
    else return Number(el.toFixed(2))
}