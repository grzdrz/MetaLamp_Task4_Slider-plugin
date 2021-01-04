import Vector from '../../src/RangeSlider/Helpers/Vector';

describe('Vector', function () {
  describe('Vector constructor', function () {
    it('Создание экземмпляра вектора', function () {
      let actual = new Vector(5, 10);
      assert.instanceOf(actual, Vector);
    });
  });

  describe('Свойства аксессоры над координатами вектора', function () {
    it('Считывание x координаты', function () {
      let vector = new Vector(5, 10);
      let actual = vector.x;
      let expected = 5;
      assert.equal(actual, expected);
    });

    it('Считывание y координаты', function () {
      let vector = new Vector(5, 10);
      let actual = vector.y;
      let expected = 10;
      assert.equal(actual, expected);
    });

    it('Запись x координаты', function () {
      let vector = new Vector(5, 10);
      vector.x = 7;
      let actual = vector.x;
      let expected = 7;
      assert.equal(actual, expected);
    });

    it('Запись y координаты', function () {
      let vector = new Vector(5, 10);
      vector.y = 11;
      let actual = vector.y;
      let expected = 11;
      assert.equal(actual, expected);
    });

    it('width возвращает x координату вектора', function () {
      let vector = new Vector(5, 10);
      let actual = vector.width;
      let expected = 5;
      assert.equal(actual, expected);
    });

    it('height возвращает y координату вектора', function () {
      let vector = new Vector(5, 10);
      let actual = vector.height;
      let expected = 10;
      assert.equal(actual, expected);
    });

    it('width перезаписывает x координату вектора', function () {
      let vector = new Vector(5, 10);
      vector.width = 7;
      let actual = vector.width;
      let expected = 7;
      assert.equal(actual, expected);
    });

    it('height перезаписывает y координату вектора', function () {
      let vector = new Vector(5, 10);
      vector.height = 11;
      let actual = vector.height;
      let expected = 11;
      assert.equal(actual, expected);
    });
  });

  describe('sum(сложение векторов)', function () {
    let vector1: Vector;
    let vector2: Vector;
    beforeAll(function () {
      vector1 = new Vector(1, 2);
      vector2 = new Vector(2, 3);
    });

    //'Результатом суммы векторов является вектор, чьи координаты равны сумме соответствующих координат слагаемых векторов'
    it('Возвращает вектор', function () {
      let resultVector = vector1.sum(vector2);
      assert.instanceOf(resultVector, Vector);
    });

    it('Сумма x координат векторов', function () {
      let resultVector = vector1.sum(vector2);
      let expectedX = 3;
      assert.equal(resultVector.x, expectedX);
    });
    it('Сумма y координат векторов', function () {
      let resultVector = vector1.sum(vector2);
      let expectedY = 5;
      assert.equal(resultVector.y, expectedY);
    });
  });

  describe('subtract(разность векторов)', function () {
    let vector1: Vector;
    let vector2: Vector;
    beforeAll(function () {
      vector1 = new Vector(1, 2);
      vector2 = new Vector(2, 3);
    });

    it('Возвращает вектор', function () {
      let resultVector = vector1.subtract(vector2);
      assert.instanceOf(resultVector, Vector);
    });

    it('Разность x координат векторов', function () {
      let resultVector = vector1.subtract(vector2);
      let expectedX = -1;
      assert.equal(resultVector.x, expectedX);
    });
    it('Разность y координат векторов', function () {
      let resultVector = vector1.subtract(vector2);
      let expectedY = -1;
      assert.equal(resultVector.y, expectedY);
    });
  });

  describe('sumNumber(сложение вектора с числом)', function () {
    let vector1: Vector;
    beforeAll(function () {
      vector1 = new Vector(1, 2);
    });

    //'Результатом суммы вектора с числом является вектор, чьи координаты равны сумме соответствующих координат исходного вектора и числа'
    //(в матане если что такой операции нету, но тут она нужна для удобства)
    it('Возвращает вектор', function () {
      let resultVector = vector1.sumNumber(1);
      assert.instanceOf(resultVector, Vector);
    });

    it('Сумма x координаты и числа', function () {
      let resultVector = vector1.sumNumber(5);
      let expectedX = 6;
      assert.equal(resultVector.x, expectedX);
    });
    it('Сумма y координаты вектора и числа', function () {
      let resultVector = vector1.sumNumber(-5);
      let expectedY = -3;
      assert.equal(resultVector.y, expectedY);
    });
  });

  describe('multiplyByNumber(умножение вектора на число)', function () {
    let vector1: Vector;
    beforeAll(function () {
      vector1 = new Vector(1, 2);
    });

    //'Результатом умножения вектора на число является вектор, чьи координаты равны произведению соответствующих координат исходного вектора и числа'
    it('Возвращает вектор', function () {
      let resultVector = vector1.multiplyByNumber(1);
      assert.instanceOf(resultVector, Vector);
    });

    it('Умножение x координаты вектора на число', function () {
      let resultVector = vector1.multiplyByNumber(5);
      let expectedX = 5;
      assert.equal(resultVector.x, expectedX);
    });

    it('Умножение y координаты вектора на число', function () {
      let resultVector = vector1.multiplyByNumber(5);
      let expectedY = 10;
      assert.equal(resultVector.y, expectedY);
    });
  });

  describe('calculateScalarProduct(скалярное произведение векторов через их координаты', function () {
    let vector1: Vector;
    let vector2: Vector;
    beforeAll(function () {
      vector1 = new Vector(2, 3);
      vector2 = new Vector(5, 10);
    });

    //'Результатом скалярного произведения векторов является число(скаляр), равное сумме произведений соответствующих координат исходных векторов'
    it('Возвращает число', function () {
      let resultNumber = vector1.calculateScalarProduct(vector2);
      assert.typeOf(resultNumber, 'number');
    });

    it('Результат скалярного произведения', function () {
      let actual = vector1.calculateScalarProduct(vector2);
      let expected = 40;
      assert.equal(actual, expected);
    });
  });

  describe('length(аксессорное свойство, возвращающее модуль(длину) вектора)', function () {
    let vector1: Vector;
    beforeAll(function () {
      vector1 = new Vector(3, 4);
    });

    it('Возвращает число', function () {
      let vectorLength = vector1.length;
      assert.typeOf(vectorLength, 'number');
    });

    it('Длина вектора', function () {
      let actual = vector1.length;
      let expected = 5;
      assert.equal(actual, expected);
    });
  });

  describe('calculateVector(число векторизованное на основании значения угла)', function () {
    let number: number;
    let angleInRadians: number;
    let resultVector: Vector;
    beforeAll(function () {
      number = 2;
    });

    it('Возвращает вектор', function () {
      angleInRadians = 0;
      resultVector = Vector.calculateVector(number, angleInRadians);
      assert.instanceOf(resultVector, Vector);
    });

    it('Проверка x координаты вектора', function () {
      angleInRadians = Math.PI / 3;//(60 градусов)
      resultVector = Vector.calculateVector(number, angleInRadians);
      let actual = Number.parseFloat(resultVector.x.toFixed(4));
      let expected = 1;
      assert.equal(actual, expected);
    });

    it('Проверка y координаты вектора', function () {
      angleInRadians = Math.PI / 6;//(30 градусов)
      resultVector = Vector.calculateVector(number, angleInRadians);
      let actual = Number.parseFloat(resultVector.y.toFixed(4));
      let expected = 1;
      assert.equal(actual, expected);
    });
  });

  describe('calculateVectorProjectionOnTargetVector(найти длину проекции текущего вектора на целевой вектор)', function () {
    let vector1: Vector;
    let vector2: Vector;
    beforeAll(function () {
      vector1 = new Vector(1, 1);
      vector2 = new Vector(0, 2);
    });

    it('Возвращает число', function () {
      let result = vector1.calculateVectorProjectionOnTargetVector(vector2);
      assert.typeOf(result, 'number');
    });

    it('Значение проекции', function () {
      let result = vector1.calculateVectorProjectionOnTargetVector(vector2);
      let actual = Number.parseFloat(result.toFixed(4));;
      let expected = 1;
      assert.equal(actual, expected);
    });
  });

  describe('rotateVector(повернуть вектор на заданный угол)', function () {
    it('Возвращает вектор', function () {
      let vector1 = new Vector(1, 1);
      let result = vector1.rotateVector(Math.PI / 2);
      assert.instanceOf(result, Vector);
    });

    it('Поворот направленного строго вверх вектора по часовой стрелке на 90 градусов, x', function () {
      let vector1 = new Vector(0, 1);
      let result = vector1.rotateVector(-Math.PI / 2);

      let actualX = Number.parseFloat(result.x.toFixed(4));
      let expectedX = 1;
      assert.equal(actualX, expectedX);
    });

    it('Поворот направленного строго вверх вектора по часовой стрелке на 90 градусов, y', function () {
      let vector1 = new Vector(0, 1);
      let result = vector1.rotateVector(-Math.PI / 2);

      let actualY = Number.parseFloat(result.y.toFixed(4));
      let expectedY = 0;
      assert.equal(actualY, expectedY);
    });


    it('Поворот направленного строго вправо вектора по часовой стрелке на 90 градусов, x', function () {
      let vector1 = new Vector(1, 0);
      let result = vector1.rotateVector(-Math.PI / 2);

      let actualX = Number.parseFloat(result.x.toFixed(4));
      let expectedX = 0;
      assert.equal(actualX, expectedX);
    });

    it('Поворот направленного строго вправо вектора по часовой стрелке на 90 градусов, y', function () {
      let vector1 = new Vector(1, 0);
      let result = vector1.rotateVector(-Math.PI / 2);

      let actualY = Number.parseFloat(result.y.toFixed(4));
      let expectedY = -1;
      assert.equal(actualY, expectedY);
    });


    it('Поворот направленного строго влево вектора по часовой стрелке на 90 градусов, x', function () {
      let vector1 = new Vector(-1, 0);
      let result = vector1.rotateVector(-Math.PI / 2);

      let actualX = Number.parseFloat(result.x.toFixed(4));
      let expectedX = 0;
      assert.equal(actualX, expectedX);
    });

    it('Поворот направленного строго влево вектора по часовой стрелке на 90 градусов, y', function () {
      let vector1 = new Vector(-1, 0);
      let result = vector1.rotateVector(-Math.PI / 2);

      let actualY = Number.parseFloat(result.y.toFixed(4));
      let expectedY = 1;
      assert.equal(actualY, expectedY);
    });


    it('Поворот вектора направленного под углом 45 градусов по часовой стрелке на 90 градусов, x', function () {
      let vector1 = new Vector(1, 1);
      let result = vector1.rotateVector(-Math.PI / 2);

      let actualX = Number.parseFloat(result.x.toFixed(4));
      let expectedX = 1;
      assert.equal(actualX, expectedX);
    });

    it('Поворот вектора направленного под углом 45 градусов по часовой стрелке на 90 градусов, y', function () {
      let vector1 = new Vector(1, 1);
      let result = vector1.rotateVector(-Math.PI / 2);

      let actualY = Number.parseFloat(result.y.toFixed(4));
      let expectedY = -1;
      assert.equal(actualY, expectedY);
    });
  });
});