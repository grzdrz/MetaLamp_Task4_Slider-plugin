export class MathFunctions{
    /* constructor(){

    } */

    // доп. обработка значения, на случай если шаг дробный для того чтобы убрать лишние дробные значения
    static _cutOffJunkValuesFromFraction(value, stepSize) {
        // переводим значение шага в строку(попутно проверяя на наличие формата с экспонентой если дробь длинная)
        let temp411;
        if (this._hasEInNumber(stepSize)) {
            temp411 = this._getStringOfNumberWithoutE(stepSize);
        }
        else
            temp411 = stepSize.toString();

        // выделяем дробную часть
        let temp41 = temp411.split(".");
        let temp42 = temp41[1];

        // если дробная часть существует, то округляем значение до длины дробной части шага,
        // тем самым отрезая мусорные значения дроби, которые переодически появляются из-за неточностей при работе js с десятичными числами
        if (temp42) {
            let countOfNumbers = temp42.length;
            return Number.parseFloat(value.toFixed(countOfNumbers));
        }
        else return value;
    }

    // заменяет строку с числом в формате с экспонентой на строку с числом в обычном формате
    // например "1e-9" -> на выходе получаем "0.000000001"
    // p.s. код стырен со стаковерфлове
    static _getStringOfNumberWithoutE(number) {
        let data = number.toString().split(/[eE]/);
        if (data.length === 1) return data[0];

        let z = '',
            sign = this < 0 ? '-' : '',
            str = data[0].replace('.', ''),
            mag = Number(data[1]) + 1;

        if (mag < 0) {
            z = sign + '0.';
            while (mag++) z += '0';
            return z + str.replace(/^\-/, '');
        }
        mag -= str.length;
        while (mag--) z += '0';
        return str + z;
    }

    // проверка на запись очень большого(или маленького) числа через e(например 1e-10)
    static _hasEInNumber(number) {
        let splitByE = number.toString().split("e");
        return splitByE.length === 2;
    }
}