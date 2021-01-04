import EmptyStrip from '../../src/RangeSlider/Views/SliderView/SliderParts/EmptyStrip';
import SliderView from '../../src/RangeSlider/Views/SliderView/SliderView';
import Presenter from '../../src/RangeSlider/Presenter';
import createRangeSlider from '../../src/RangeSlider/createRangeSlider';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = createRangeSlider(container);
});

describe('EmptyStrip', function () {
  it('handleClick в EmptyStrip, клик по левому краю пустой рельсы', () => {
    const view = <SliderView>(presenter.viewManager.views[0]);
    const emptyStrip = new EmptyStrip(view);
    presenter.model.data.filledStrips = [false];

    emptyStrip.element.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 0,
      clientY: 0,
    }));

    const actual = presenter.model.data.values;
    const expected = [-100, 0];

    assert.deepEqual(actual, expected);
  });

  it('handleClick в EmptyStrip, клик по правому краю пустой рельсы', () => {
    const view = <SliderView>(presenter.viewManager.views[0]);
    const emptyStrip = new EmptyStrip(view);
    presenter.model.data.filledStrips = [false];
    presenter.viewManager.data.sliderLength = 1000;

    emptyStrip.element.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 10000000,
      clientY: 0,
    }));

    const actual = presenter.model.data.values;
    const expected = [0, 100];

    assert.deepEqual(actual, expected);
  });
});