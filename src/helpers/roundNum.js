export default function roundNum(num) {
    // Преобразуем число в строку
    let numStr = num.toString();

    // Проверяем, есть ли плавающая точка
    if (numStr.includes('.')) {
        // Разделяем число на целую и дробную части
        let [integerPart, decimalPart] = numStr.split('.');
        
        // Убираем лишние нули в дробной части
        decimalPart = decimalPart.replace(/0+$/, '');

        // Если дробная часть не пустая, оставляем 2 знака после запятой
        if (decimalPart.length > 2) {
            decimalPart = decimalPart.substring(0, 2);
        }

        // Возвращаем конечный результат
        return integerPart + (decimalPart ? '.' + decimalPart : '');
    }

    // Если плавающей точки нет, возвращаем число как есть
    return numStr;
}