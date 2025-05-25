const pointsCheck = (pointsData) => {

    const tempSet = new Set();

    for (let el of pointsData) {
        if (el <= 0) {
            return false;
        }
        tempSet.add(Number(el));
    }

    return tempSet.size === pointsData.length;
}

const paramDataCheck = (paramData) => {
    let paramDataFlag = true;

    for (let row of paramData){
        for (let el of row){
            if(el <= 0) paramDataFlag = false;
        }
    }

    return paramDataFlag
}

export const importDataChecker = (educData, controlData, factorData, workTimeData) => {

    if(pointsCheck(factorData) && pointsCheck(workTimeData) && paramDataCheck(educData) && paramDataCheck(controlData)){
        return true
    }
    else return false

}