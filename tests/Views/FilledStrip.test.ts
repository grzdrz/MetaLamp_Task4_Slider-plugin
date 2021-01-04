import FilledStrip from '../../src/RangeSlider/Views/SliderView/SliderParts/FilledStrip';
import SliderView from '../../src/RangeSlider/Views/SliderView/SliderView';
import Presenter from '../../src/RangeSlider/Presenter';
import createRangeSlider from '../../src/RangeSlider/createRangeSlider';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = createRangeSlider(container);
});

describe('FilledStrip', function () {
  it('handleClick в FilledStrip, клик по левому краю закрашенной рельсы', () => {
    const view = <SliderView>(presenter.viewManager.views[0]);
    const filledStrip = new FilledStrip(view, 0);
    presenter.model.data.filledStrips = [true];

    filledStrip.element.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 0,
      clientY: 0,
    }));

    const actual = presenter.model.data.values;
    const expected = [-100, 0];

    assert.deepEqual(actual, expected);
  });

  it('handleClick в FilledStrip, клик по правому краю закрашенной рельсы', () => {
    const view = <SliderView>(presenter.viewManager.views[0]);
    const filledStrip = new FilledStrip(view, 2);
    presenter.model.data.filledStrips = [false, false, true];
    presenter.viewManager.data.sliderLength = 1000;

    filledStrip.element.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 10000000,
      clientY: 0,
    }));

    const actual = presenter.model.data.values;
    const expected = [0, 100];

    assert.deepEqual(actual, expected);
  });
});