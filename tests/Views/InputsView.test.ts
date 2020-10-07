import InputsView from '../../src/RangeSlider/Views/InputsView/InputsView';
import Presenter from '../../src/RangeSlider/Presenter';
import createRangeSlider from '../../src/RangeSlider/createRangeSlider';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = createRangeSlider(container);
});

describe('InputsView', function () {
  it('build был вызван при обновлении с полным перерендером', function () {
    const view = <InputsView>(presenter.viewManager.views[1]);
    const buildSpy = spyOn(view, 'build');

    view.update(true);

    const callsCount = buildSpy.calls.count();

    assert.equal(callsCount, 1);
  });

  it('handleInputChange', () => {
    const view = <InputsView>(presenter.viewManager.views[1]);
    const firstInput = <HTMLInputElement>view.containerElement.querySelector('.range-slider__input_0');
    firstInput.value = '-100';
    firstInput.dispatchEvent(new Event('change', { bubbles: true }));

    const actual = presenter.model.data.values;
    const expected = [-100, 0];

    assert.deepEqual(actual, expected);
  });
});