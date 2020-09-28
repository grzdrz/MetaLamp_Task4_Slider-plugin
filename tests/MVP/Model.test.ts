import RangeSlider from '../../src/RangeSlider/RangeSlider';

describe('Model', function () {
  it('validateValues без data.values', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    const oldData = presenter.model.getData();
    presenter.model.update({
      stepSize: 5,
      maxValue: 10,
      minValue: 0,
    });
    const newData = presenter.model.getData();
    assert.deepEqual(oldData.values, newData.values);
  });

  it('validateValues без изменения значений', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    const oldData = presenter.model.getData();
    presenter.model.update({
      values: oldData.values,
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.values, oldData.values);
  });

  it('validateValues с изменением до 1го значения', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      values: [0],
    });
    const newData = presenter.model.getData();
    assert.deepEqual(newData.values, [0]);
  });

  it('validateValues с изменением более 1го значения вперед направлении', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      canPush: false,
      values: [0, 30],
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.values, [0, 30]);
  });

  it('validateValues с изменением более 1го значения вперед направлении с проталкиванием вперед', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      canPush: true,
      values: [10, 0],
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.values, [10, 10]);
  });

  it('validateValues с изменением более 1го значения назад направлении с проталкиванием назад', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      canPush: true,
      values: [0, -10],
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.values, [-10, -10]);
  });

  it('validateValues с изменением более 1го значения вперед с выходом за максимальное значение', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      canPush: true,
      values: [0, 110],
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.values, [0, 100]);
  });

  it('validateValues с изменением более 1го значения назад с выходом за минимальное значение', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      canPush: true,
      values: [-110, 0],
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.values, [-100, 0]);
  });

  it('validateMaxValue', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      maxValue: 50,
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.maxValue, 50);
  });

  it('validateMaxValue с попыткой установить значение не кратное шагу', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      maxValue: 109,
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.maxValue, 110);
  });

  it('validateMaxValue с попыткой зайти за минимальное значение', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      maxValue: -110,
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.maxValue, -90);
  });

  it('validateMinValue', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      minValue: -50,
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.minValue, -50);
  });

  it('validateMinValue с попыткой установить значение не кратное шагу', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      minValue: -109,
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.minValue, -110);
  });

  it('validateMinValue с попыткой зайти за максимально значение', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      minValue: 110,
    });

    const newData = presenter.model.getData();
    assert.deepEqual(newData.minValue, 90);
  });

  it('calculateNearestPositionForHandle с минимальным значение больше 0', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      stepSize: 1,
    });
    presenter.model.update({
      maxValue: 11,
    });
    presenter.model.update({
      minValue: 1,
    });

    const data1 = presenter.model.getData(/* data1 */);
    if (data1.values) data1.values[1] = 12;
    presenter.model.update({
      values: data1.values,
    });

    /* const data2 = new EventArgs<IModelData>({}); */
    const data2 = presenter.model.getData(/* data2 */);
    if (data2.values) data2.values[0] = 0;
    presenter.model.update({
      values: data2.values,
    });

    const newData = presenter.model.getData();

    assert.deepEqual(newData.stepSize, 1);
    assert.deepEqual(newData.maxValue, 11);
    assert.deepEqual(newData.minValue, 1);
    assert.deepEqual(newData.values, [1, 11]);
  });

  it('calculateNearestPositionForHandle с минимальным значение меньше 0', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    presenter.model.update({
      stepSize: 1,
    });
    presenter.model.update({
      maxValue: 11,
    });
    presenter.model.update({
      minValue: -1,
    });

    const data1 = presenter.model.getData();
    if (data1.values) data1.values[1] = 12;
    presenter.model.update({
      values: data1.values,
    });

    const data2 = presenter.model.getData();
    if (data2.values) data2.values[0] = -2;
    presenter.model.update({
      values: data2.values,
    });

    const newData = presenter.model.getData();

    assert.deepEqual(newData.stepSize, 1);
    assert.deepEqual(newData.maxValue, 11);
    assert.deepEqual(newData.minValue, -1);
    assert.deepEqual(newData.values, [-1, 11]);
  });
});