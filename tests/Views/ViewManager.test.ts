import IViewData from '../../src/RangeSlider/Data/IViewData';
import EventArgs from '../../src/RangeSlider/Events/EventArgs';
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
    presenter.viewManager.update({});
    const newData = presenter.viewManager.getData();

    assert.equal(oldData.angle, newData.angle);
    assert.equal(oldData.borderThickness, newData.borderThickness);
    assert.deepEqual(oldData.filledStrips, newData.filledStrips);
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

  it('invoke eventsА', function () {
    presenter.viewManager.onSetViewData.invoke(new EventArgs<IViewData>({
      isHandlesSeparated: true,
      hasTooltip: false,
      filledStrips: [true, true, true],
    }));

    const data1 = presenter.viewManager.getData();
    assert.deepEqual(data1.filledStrips, [true, true, true]);


    presenter.viewManager.onSetViewData.invoke(new EventArgs<IViewData>({
      isHandlesSeparated: false,
    }));
    presenter.viewManager.onSetViewData.invoke(new EventArgs<IViewData>({
      filledStrips: [true, true, true],
    }));

    const data2 = presenter.viewManager.getData();
    assert.deepEqual(data2.filledStrips, [true, true, true]);
  });
});