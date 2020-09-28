import Presenter from '../src/RangeSlider/MVP/Presenter';
import RangeSlider from '../src/RangeSlider/RangeSlider';

describe('RangeSlider', function () {
  it('Создание экземмпляра RangeSlider', function () {
    const rangeSlider = new RangeSlider();
    assert.instanceOf(rangeSlider, RangeSlider);
  });

  it('createRangeSlider', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    assert.instanceOf(presenter, Presenter);
  });

  it('без опций', function () {
    const container = document.createElement('div');
    const presenter = RangeSlider.createRangeSlider(container, {}, {});

    const pluginContainer = presenter.viewManager.containerElement.querySelector('.range-slider');
    const inputsContainer = presenter.viewManager.containerElement.querySelector('.range-slider__additional-container');

    assert.isNotNull(pluginContainer);
    assert.isNotNull(inputsContainer);
  });
});