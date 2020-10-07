import Handle from "../../src/RangeSlider/Views/SliderView/SliderParts/Handle";
import SliderView from "../../src/RangeSlider/Views/SliderView/SliderView";
import Presenter from "../../src/RangeSlider/Presenter";
import createRangeSlider from '../../src/RangeSlider/createRangeSlider';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = createRangeSlider(container);
});

describe('Handle', function () {
  it('d&d обработчики, сдвигаем второй ползунок влево до упора, проталкивая при этом первый ползунок', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);
    const handles = <Handle[]>view.parts.filter((part) => part instanceof Handle);
    const secondHandle = handles[1];

    secondHandle.element.dispatchEvent(new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 0,
      clientY: 0,
    }));
    document.dispatchEvent(new MouseEvent('mousemove', {
      bubbles: true,
      clientX: -100,
      clientY: 0,
    }));
    document.dispatchEvent(new MouseEvent('mouseup', {
      bubbles: true,
      clientX: -100,
      clientY: 0,
    }));

    const actual = presenter.model.data.values;
    const expected = [-100, -100];

    assert.deepEqual(actual, expected);
  });
});
