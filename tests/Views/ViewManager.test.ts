import createRangeSlider from '../../src/RangeSlider/createRangeSlider';
import Presenter from '../../src/RangeSlider/Presenter';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = createRangeSlider(container);
});

describe('ViewManager', function () {
  it('обновление viewManager без указания данных', function () {
    const oldData = presenter.viewManager.getData();
    presenter.viewManager.updateData({});
    const newData = presenter.viewManager.getData();

    assert.equal(oldData.angle, newData.angle);
    assert.equal(oldData.borderThickness, newData.borderThickness);
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
    presenter.viewManager.updateData({
      angle: 91,
    });

    const updatedData = presenter.viewManager.getData();
    assert.equal(updatedData.angle, 90);
  });

  it('валидация угла при передачи в update менее 0 градусов', function () {
    presenter.viewManager.updateData({
      angle: -1,
    });

    const updatedData = presenter.viewManager.getData();
    assert.equal(updatedData.angle, 0);
  });
});