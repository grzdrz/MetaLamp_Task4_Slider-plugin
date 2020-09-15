import ModelData from '../../src/RangeSlider/Data/ModelData';

describe('RangeSlider', function () {
  it('Создание экземмпляра RangeSlider', function () {
    const defaultData = new ModelData({});
    assert.instanceOf(defaultData, ModelData);
  });

  it('дефолтные значения', function () {
    const defaultData = new ModelData({});

    assert.equal(defaultData.id, 0);
    assert.equal(defaultData.minValue, -100);
    assert.equal(defaultData.maxValue, 100);
    assert.deepStrictEqual(defaultData.values, [0, 0]);
    assert.equal(defaultData.stepSize, 10);
    assert.equal(defaultData.canPush, true);
  });

  it('кастомные значения', function () {
    const defaultData = new ModelData({
      id: 1,
      minValue: -9,
      maxValue: 9,
      values: [-3, 3],
      stepSize: 0.000001,
      canPush: false,
    });

    assert.equal(defaultData.id, 1);
    assert.equal(defaultData.minValue, -9);
    assert.equal(defaultData.maxValue, 9);
    assert.deepStrictEqual(defaultData.values, [-3, 3]);
    assert.equal(defaultData.stepSize, 0.000001);
    assert.equal(defaultData.canPush, false);
  });

  it('deltaMaxMin', function () {
    const data = new ModelData({
      minValue: -9,
      maxValue: 9,
    });

    assert.equal(data.deltaMaxMin, 18);
  });
});