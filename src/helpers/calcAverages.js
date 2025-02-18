export const calcAverages = (paramData) => {
    let averages = [[], []];
    
    for (let i = 0; i < paramData.educ[0][0].length; i++){
        let sum = 0;
        for (let j = 0; j < paramData.educ.length; j++){
            sum += paramData.educ[j][0][i]
        }
        averages[0].push((sum / paramData.educ.length).toFixed(3))
    }
    for (let i = 0; i < paramData.educ[0][1].length; i++){
        let sum = 0;
        for (let j = 0; j < paramData.educ.length; j++){
            sum += paramData.educ[j][1][i]
        }
        averages[1].push((sum / paramData.educ.length).toFixed(3))

    }

    return averages;
}