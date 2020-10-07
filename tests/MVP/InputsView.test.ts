import InputsView from '../../src/RangeSlider/MVP/Views/InputsView/InputsView';
import Presenter from '../../src/RangeSlider/MVP/Presenter';
import RangeSlider from '../../src/RangeSlider/RangeSlider';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = RangeSlider.createRangeSlider(container);
});

describe('InputsView', function () {
  it('build был вызван при обновлении с полным перерендером', function () {
    const view = <InputsView>(presenter.viewManager.views[1]);
    const buildSpy = spyOn(view, 'build');

    view.update(true);

    const callsCount = buildSpy.calls.count();

    assert.equal(callsCount, 1);
  });

  it('обработчики вызваются корректно', function () {
    const view = <InputsView>(presenter.viewManager.views[1]);
    const input = <HTMLInputElement>(view.containerElement.querySelector('.range-slider__input_0'));

    const spy = jasmine.createSpy();
    input.addEventListener('change', spy);

    const eventClick = new window.Event('change', { bubbles: true });
    input.dispatchEvent(eventClick);

    const callsCount = spy.calls.count();
    assert.equal(callsCount, 1);
  });
});