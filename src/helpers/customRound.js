export const customRound = (num) => {
    let check = false;
    let rounded = num.toString();
    let negative = false;

    for (let i = 0; i < num.toString().length; i++) {
        if (num.toString()[i] == ".") {
            check = true;
            break;
        }
    }

    if (!check) return num;

    if (rounded[0] == "-") {
        rounded = rounded.slice(1);
        negative = true;
    }

    let dotIndex = 1;
    for (let i = 1; i < rounded.length; i++) {
        if (rounded[1] == ".") {
            dotIndex = i;
            break;
        }
    }

    let temp = 0;
    if (Number(rounded[0] == 0)) {
        for (let i = dotIndex + 1; i < rounded.length; i++) {
            if (Number(rounded[i]) != 0) {
                temp = i;
                break;
            }
        }
        rounded = rounded.slice(0, temp + 1 + dotIndex);
    } else {
        rounded = Number(rounded).toFixed(2);
    }

    if (negative) rounded = "-" + rounded;

    return Number(rounded);
};
