import createRangeSlider from "../src/RangeSlider/createRangeSlider";

describe('createRangeSlider', function () {
  it('создание без опций', function () {
    const container = document.createElement('div');
    const presenter = createRangeSlider(container, {}, {});

    const pluginContainer = presenter.viewManager.containerElement.querySelector('.range-slider');
    const inputsContainer = presenter.viewManager.containerElement.querySelector('.range-slider__additional-container');

    assert.isNotNull(pluginContainer);
    assert.isNotNull(inputsContainer);
  });
});