import Presenter from '../../src/RangeSlider/MVP/Presenter';
import RangeSlider from '../../src/RangeSlider/RangeSlider';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = RangeSlider.createRangeSlider(container);
});

describe('ViewManager', function () {
  it('обновление viewManager без указания данных', function () {
    const oldData = presenter.viewManager.getData();
    presenter.viewManager.update({});
    const newData = presenter.viewManager.getData();

    assert.equal(oldData.angle, newData.angle);
    assert.equal(oldData.borderThickness, newData.borderThickness);
    assert.deepStrictEqual(oldData.filledStrips, newData.filledStrips);
    assert.equal(oldData.handleHeight, newData.handleHeight);
    assert.equal(oldData.handleWidth, newData.handleWidth);
    assert.equal(oldData.hasScale, newData.hasScale);
    assert.equal(oldData.isHandlesSeparated, newData.isHandlesSeparated);
    assert.equal(oldData.maxSegmentsCount, newData.maxSegmentsCount);
    assert.equal(oldData.tooltipMargin, newData.tooltipMargin);
    assert.equal(oldData.scaleMargin, newData.scaleMargin);
    assert.equal(oldData.sliderLength, newData.sliderLength);
    assert.equal(oldData.sliderStripThickness, newData.sliderStripThickness);
  });

  it('валидация угла при передачи в update более 90 градусов', function () {
    presenter.viewManager.update({
      angle: 91,
    });

    const updatedData = presenter.viewManager.getData();
    assert.equal(updatedData.angle, 90);
  });

  it('валидация угла при передачи в update менее 0 градусов', function () {
    presenter.viewManager.update({
      angle: -1,
    });

    const updatedData = presenter.viewManager.getData();
    assert.equal(updatedData.angle, 0);
  });

  it('валидация численности интервальных полос при большей численности значений', function () {
    presenter.viewManager.update({
      filledStrips: [true],
    });

    const updatedData = presenter.viewManager.getData();
    assert.deepEqual(updatedData.filledStrips, [true, false, false]);
  });
});