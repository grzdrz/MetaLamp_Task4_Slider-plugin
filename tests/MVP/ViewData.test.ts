import ViewData from '../../src/RangeSlider/Data/ViewData';

describe('RangeSlider', function () {
  it('Создание экземмпляра RangeSlider', function () {
    const defaultData = new ViewData({});
    assert.instanceOf(defaultData, ViewData);
  });

  it('дефолтные значения', function () {
    const defaultData = new ViewData({});

    assert.equal(defaultData.sliderLength, 0);
    assert.equal(defaultData.sliderStripThickness, 10);
    assert.equal(defaultData.handleWidth, 15);
    assert.equal(defaultData.handleHeight, 15);
    assert.equal(defaultData.borderThickness, 5);
    assert.equal(defaultData.maxSegmentsCount, 10);
    assert.equal(defaultData.tooltipMargin, 10);
    assert.equal(defaultData.angle, 0);
    assert.deepStrictEqual(defaultData.filledStrips, [true, false]);
    assert.equal(defaultData.isHandlesSeparated, false);
    assert.equal(defaultData.hasScale, true);
    assert.equal(defaultData.scaleMargin, 30);
  });

  it('кастомные значения', function () {
    const defaultData = new ViewData({
      sliderStripThickness: 20,
      handleWidth: 20,
      handleHeight: 20,
      borderThickness: 10,
      maxSegmentsCount: 6,
      tooltipMargin: 15,
      angle: 45,
      filledStrips: [true, false, true],
      isHandlesSeparated: false,
      hasScale: true,
      scaleMargin: 30,
    });

    assert.equal(defaultData.sliderLength, 0);
    assert.equal(defaultData.sliderStripThickness, 20);
    assert.equal(defaultData.handleWidth, 20);
    assert.equal(defaultData.handleHeight, 20);
    assert.equal(defaultData.borderThickness, 10);
    assert.equal(defaultData.maxSegmentsCount, 6);
    assert.equal(defaultData.tooltipMargin, 15);
    assert.equal(defaultData.angle, 45);
    assert.deepStrictEqual(defaultData.filledStrips, [true, false, true]);
    assert.equal(defaultData.isHandlesSeparated, false);
    assert.equal(defaultData.hasScale, true);
    assert.equal(defaultData.scaleMargin, 30);
  });

  it('angleInRad', function () {
    const data = new ViewData({
      angle: 45,
    });

    assert.equal(data.angleInRad, Math.PI / 4);
  });
});