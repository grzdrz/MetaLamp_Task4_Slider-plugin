import SliderView from "../../src/RangeSlider/Views/SliderView/SliderView";
import Presenter from "../../src/RangeSlider/Presenter";
import createRangeSlider from '../../src/RangeSlider/createRangeSlider';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = createRangeSlider(container);
});

describe('Scale', function () {
  it('handleSegmentClick в Scale, клик по левому крайнему сегменту шкалы', () => {
    const view = <SliderView>(presenter.viewManager.views[0]);
    const firstSegment = <HTMLDivElement>view.containerElement.querySelector('.range-slider__scale-segment');

    firstSegment.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const actual = presenter.model.data.values;
    const expected = [-100, 0];

    assert.deepEqual(actual, expected);
  });
});