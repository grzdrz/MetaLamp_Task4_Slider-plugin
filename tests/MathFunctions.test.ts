import { MathFunctions } from "../src/RangeSlider/Helpers/MathFunctions";

describe("cutOffJunkValuesFromFraction(обрезание мусорных значений)", function () {
    it("Число 0.1234000000111 после обрезания десятичной части до длины десятичной части размера шага 0.1111 будет равно 0.1234",
        function () {
            let actual = MathFunctions.cutOffJunkValuesFromFraction(0.1234000000111, 0.1111);
            let expected = 0.1234;
            assert.equal(actual, expected, "Несовпадение значений");
        }
    );

    it("Число 1234.1234000000111 после обрезания десятичной части до длины десятичной части размера шага 1111.1111 будет равно 1234.1234",
        function () {
            let actual = MathFunctions.cutOffJunkValuesFromFraction(1234.1234000000111, 1111.1111);
            let expected = 1234.1234;
            assert.equal(actual, expected, "Несовпадение значений");
        }
    );

    it("Число 0.0 после обрезания десятичной части до длины десятичной части размера шага 0.1111 будет равно 0.0",
        function () {
            let actual = MathFunctions.cutOffJunkValuesFromFraction(0.0, 0.1111);
            let expected = 0.0;
            assert.equal(actual, expected, "Несовпадение значений");
        }
    );

    it("Число 0 после обрезания десятичной части до длины десятичной части размера шага 0.1111 будет равно 0",
        function () {
            let actual = MathFunctions.cutOffJunkValuesFromFraction(0, 0.1111);
            let expected = 0;
            assert.equal(actual, expected, "Несовпадение значений");
        }
    );

    it("",
        function () {
            let actual = MathFunctions.cutOffJunkValuesFromFraction(1234.00000000000000000000001, 0.0000000000000000001);
            let expected = 1234.0;
            assert.equal(actual, expected, "Несовпадение значений");
        }
    );
});