import createRangeSlider from '../../src/RangeSlider/createRangeSlider';
import Presenter from '../../src/RangeSlider/Presenter';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = createRangeSlider(container);
});

describe('ModelValidator', function () {
  describe('validateValues', function () {
    it('без data.values', function () {
      const oldData = presenter.model.getData();
      presenter.model.updateData({
        stepSize: 5,
        maxValue: 10,
        minValue: 0,
      });
      const newData = presenter.model.getData();
      assert.deepEqual(oldData.values, newData.values);
    });

    it('без изменения значений', function () {
      const oldData = presenter.model.getData();
      presenter.model.updateData({
        values: oldData.values,
      });

      const newData = presenter.model.getData();
      assert.deepEqual(newData.values, oldData.values);
    });

    it('с изменением до 1го значения', function () {
      presenter.model.updateData({
        values: [0],
      });
      const newData = presenter.model.getData();
      assert.deepEqual(newData.values, [0]);
    });

    it('с изменением более 1го значения вперед направлении', function () {
      presenter.model.updateData({
        canPush: false,
        values: [0, 30],
      });

      const newData = presenter.model.getData();
      assert.deepEqual(newData.values, [0, 30]);
    });

    it('с изменением более 1го значения вперед направлении с проталкиванием вперед', function () {
      presenter.model.updateData({
        canPush: true,
        values: [10, 0],
      });

      const newData = presenter.model.getData();
      assert.deepEqual(newData.values, [10, 10]);
    });

    it('с изменением более 1го значения назад направлении с проталкиванием назад', function () {
      presenter.model.updateData({
        canPush: true,
        values: [0, -10],
      });

      const newData = presenter.model.getData();
      assert.deepEqual(newData.values, [-10, -10]);
    });

    it('с изменением более 1го значения вперед с выходом за максимальное значение', function () {
      presenter.model.updateData({
        canPush: true,
        values: [0, 110],
      });

      const newData = presenter.model.getData();
      assert.deepEqual(newData.values, [0, 100]);
    });

    it('с изменением более 1го значения назад с выходом за минимальное значение', function () {
      presenter.model.updateData({
        canPush: true,
        values: [-110, 0],
      });

      const newData = presenter.model.getData();
      assert.deepEqual(newData.values, [-100, 0]);
    });
  });

  describe('validateMaxValue', function () {
    it('с дефолтными значениями', function () {
      presenter.model.updateData({
        maxValue: 50,
      });

      const newData = presenter.model.getData();
      assert.equal(newData.maxValue, 50);
    });

    it('с попыткой установить значение не кратное шагу', function () {
      presenter.model.updateData({
        maxValue: 109,
      });

      const newData = presenter.model.getData();
      assert.equal(newData.maxValue, 110);
    });

    it('с попыткой зайти за минимальное значение', function () {
      presenter.model.updateData({
        maxValue: -110,
      });

      const newData = presenter.model.getData();
      assert.equal(newData.maxValue, -90);
    });
  });

  describe('validateMinValue', function () {
    it('с дефолтными значениями', function () {
      presenter.model.updateData({
        minValue: -50,
      });

      const newData = presenter.model.getData();
      assert.equal(newData.minValue, -50);
    });

    it('с попыткой установить значение не кратное шагу', function () {
      presenter.model.updateData({
        minValue: -109,
      });

      const newData = presenter.model.getData();
      assert.equal(newData.minValue, -110);
    });

    it('с попыткой зайти за максимально значение', function () {
      presenter.model.updateData({
        minValue: 110,
      });

      const newData = presenter.model.getData();
      assert.equal(newData.minValue, 90);
    });
  });

  describe('calculateNearestPositionForHandle', function () {
    it('с минимальным значение больше 0', function () {
      presenter.model.updateData({
        stepSize: 1,
      });
      presenter.model.updateData({
        maxValue: 11,
      });
      presenter.model.updateData({
        minValue: 1,
      });

      const data1 = presenter.model.getData();
      if (data1.values) data1.values[1] = 12;
      presenter.model.updateData({
        values: data1.values,
      });

      const data2 = presenter.model.getData();
      if (data2.values) data2.values[0] = 0;
      presenter.model.updateData({
        values: data2.values,
      });

      const newData = presenter.model.getData();

      assert.equal(newData.stepSize, 1);
      assert.equal(newData.maxValue, 11);
      assert.equal(newData.minValue, 1);
      assert.deepEqual(newData.values, [1, 11]);
    });

    it('с минимальным значение меньше 0', function () {
      presenter.model.updateData({
        stepSize: 1,
      });
      presenter.model.updateData({
        maxValue: 11,
      });
      presenter.model.updateData({
        minValue: -1,
      });

      const data1 = presenter.model.getData();
      if (data1.values) data1.values[1] = 12;
      presenter.model.updateData({
        values: data1.values,
      });

      const data2 = presenter.model.getData();
      if (data2.values) data2.values[0] = -2;
      presenter.model.updateData({
        values: data2.values,
      });

      const newData = presenter.model.getData();

      assert.equal(newData.stepSize, 1);
      assert.equal(newData.maxValue, 11);
      assert.equal(newData.minValue, -1);
      assert.deepEqual(newData.values, [-1, 11]);
    });
  });

  describe('validateFilledStrips', function () {
    it('валидация численности интервальных полос при большей численности значений', function () {
      presenter.model.updateData({
        filledStrips: [true],
      });

      const updatedData = presenter.model.getData();
      assert.deepEqual(updatedData.filledStrips, [true, false, false]);
    });
  });
});