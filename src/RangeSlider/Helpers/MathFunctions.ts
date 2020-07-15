class MathFunctions {
    /* constructor(){

    } */

    // доп. обработка значения, на случай если шаг дробный для того чтобы убрать лишние дробные значения
    static cutOffJunkValuesFromFraction(value: number, stepSize: number): number {
        // переводим значение шага в строку(попутно проверяя на наличие формата с экспонентой если дробь длинная)
        let stringOfNumber: string = "";
        if (this.hasEInNumber(stepSize)) {
            stringOfNumber = this.getStringOfNumberWithoutE(stepSize);
        }
        else
            stringOfNumber = stepSize.toString();

        // выделяем дробную часть
        let fractionalPart: string = stringOfNumber.split(".")[1];

        // если дробная часть существует, то округляем значение до длины дробной части шага,
        // тем самым отрезая мусорные значения дроби, которые переодически появляются из-за неточностей при работе js с десятичными числами
        if (fractionalPart) {
            let countOfNumbers: number = fractionalPart.length;
            return Number.parseFloat(value.toFixed(countOfNumbers));
        }
        else
            return value;
    }

    // заменяет строку с числом в формате с экспонентой на строку с числом в обычном формате
    // например "1e-9" -> на выходе получаем "0.000000001"
    // p.s. код стырен со стаковерфлове
    static getStringOfNumberWithoutE(number: number): string {
        let numberParts: string[] = number.toString().split(/[eE]/);
        if (numberParts.length === 1) return numberParts[0];

        let z: string = "";
        let sign: string = number < 0 ? '-' : '';
        let str: string = numberParts[0].replace('.', '');
        let mag: number = Number(numberParts[1]) + 1;

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
    static hasEInNumber(number: number): boolean {
        let splitByE: string[] = number.toString().split("e");
        return splitByE.length === 2;
    }

    static getFractionOfNumber(number: number): number {
        let test1 = number.toString().split(".");
        let test12: string;
        if (test1.length > 1) {
            test12 = `0.${test1[1]}`;
            return Number.parseFloat(test12);
        }
        return 0;
    }
}

export default MathFunctions;
