
const k = Math.pow(8.617, Math.pow(10, -5));

const TPart = (Tw, Ta) => {
    return Math.exp(0.7 * ((1 / Tw) - (1 / Ta)) / k)
}

const UPart = (Uw, Ua, beta) => {
    return Math.exp(beta * (Ua - Uw))
}

export default function calcTAF(Tw, Ta, Uw, Ua, beta){
    return (TPart(Tw, Ta) * UPart(Uw, Ua, beta))
}
