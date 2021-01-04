import MathFunctions from '../../src/RangeSlider/Helpers/MathFunctions';

describe('MathFunctions', function () {
  describe('cutOffJunkValuesFromFraction(обрезание мусорных значений)', function () {
    it('Отрезать от числа первого параметра с конца n чисел, где n равно длине десятичной части второго параметра',
      function () {
        let actual = MathFunctions.cutOffJunkValuesFromFraction(0.1234000000111, 0.1111);
        let expected = 0.1234;
        assert.equal(actual, expected);
      }
    );

    it('Учет значений записаных в экспоненциальной форме',
      function () {
        let actual = MathFunctions.cutOffJunkValuesFromFraction(1234.00000000000000000000001, 0.0000000000000000001);
        let expected = 1234.0;
        assert.equal(actual, expected);
      }
    );

    it('Проверка значений без десятичной части',
      function () {
        let actual = MathFunctions.cutOffJunkValuesFromFraction(1234, 1234);
        let expected = 1234;
        assert.equal(actual, expected);
      }
    );
  });

  describe('hasEInNumber', function () {
    it('Есть e в числе', function () {
      let actual = MathFunctions.hasEInNumber(0.000000000000000000001);
      assert.isTrue(actual);
    })

    it('Нет e в числе', function () {
      let actual = MathFunctions.hasEInNumber(0.1);
      assert.isFalse(actual);
    })
  });

  describe('getFractionOfNumber', function () {
    it('Получить десятичную часть числа у которого она есть', function () {
      let actual = MathFunctions.getFractionOfNumber(123.3456);
      let expected = 0.3456;
      assert.equal(actual, expected);
    })

    it('Получить десятичную часть числа у которого её нет', function () {
      let actual = MathFunctions.getFractionOfNumber(123);
      let expected = 0;
      assert.equal(actual, expected);
    })
  });

  describe('calculateEllipseSurfacePointCoordinate', function () {
    it('Крайнее значение - 0 рад(0град)', function () {
      let actualVectorLength = MathFunctions.calculateEllipseSurfacePointCoordinate(2, 1, 0).length;
      let expected = 2;
      assert.equal(actualVectorLength, expected);
    })

    it('Крайнее значение - PI/2 рад(90 град)', function () {
      let actualVectorLength = MathFunctions.calculateEllipseSurfacePointCoordinate(2, 1, Math.PI / 2).length;
      let expected = 1;
      assert.equal(actualVectorLength, expected);
    })
  });

  describe('getStringOfNumberWithoutE', function () {
    it('Число без экспоненты', function () {
      let actual = MathFunctions.getStringOfNumberWithoutE(1);
      let expected = '1';
      assert.equal(actual, expected);
    })

    it('1e-10 -> 0.0000000001', function () {
      let actual = MathFunctions.getStringOfNumberWithoutE(1e-10);
      let expected = '0.0000000001';
      assert.equal(actual, expected);
    })

    it('-1e-10 -> 0.0000000001', function () {
      let actual = MathFunctions.getStringOfNumberWithoutE(-1e-10);
      let expected = '-0.0000000001';
      assert.equal(actual, expected);
    })

    it('1e21 -> 1000000000000000000000', function () {
      let actual = MathFunctions.getStringOfNumberWithoutE(1e21);
      let expected = '1000000000000000000000';
      assert.equal(actual, expected);
    })

    it('-1e21 -> 1000000000000000000000', function () {
      let actual = MathFunctions.getStringOfNumberWithoutE(-1e21);
      let expected = '-1000000000000000000000';
      assert.equal(actual, expected);
    })
  });
});