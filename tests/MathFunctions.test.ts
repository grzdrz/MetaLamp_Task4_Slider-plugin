import MathFunctions from "../src/RangeSlider/Helpers/MathFunctions";

describe("cutOffJunkValuesFromFraction(обрезание мусорных значений)", function () {
    it("Отрезать от числа первого параметра с конца n чисел, где n равно длине десятичной части второго параметра",
        function () {
            let actual = MathFunctions.cutOffJunkValuesFromFraction(0.1234000000111, 0.1111);
            let expected = 0.1234;
            assert.equal(actual, expected, "Несовпадение значений");
        }
    );

    it("Учет значений записаных в экспоненциальной форме",
        function () {
            let actual = MathFunctions.cutOffJunkValuesFromFraction(1234.00000000000000000000001, 0.0000000000000000001);
            let expected = 1234.0;
            assert.equal(actual, expected, "Несовпадение значений");
        }
    );

    it("Проверка значений без десятичной части",
        function () {
            let actual = MathFunctions.cutOffJunkValuesFromFraction(1234, 1234);
            let expected = 1234;
            assert.equal(actual, expected, "Несовпадение значений");
        }
    );
});

describe("hasEInNumber", function () {
    it("Есть e в числе", function () {
        let actual = MathFunctions.hasEInNumber(0.000000000000000000001);
        assert.isTrue(actual);
    })

    it("Нет e в числе", function () {
        let actual = MathFunctions.hasEInNumber(0.1);
        assert.isFalse(actual);
    })
});

describe("getFractionOfNumber", function () {
    it("Получить десятичную часть числа у которого она есть", function(){
        let actual = MathFunctions.getFractionOfNumber(123.3456);
        let expected = 0.3456;
        assert.equal(actual, expected, "");
    })

    it("Получить десятичную часть числа у которого её нет", function () {
        let actual = MathFunctions.getFractionOfNumber(123);
        let expected = 0;
        assert.equal(actual, expected, "");
    })
});