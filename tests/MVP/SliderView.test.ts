import SliderView from '../../src/RangeSlider/MVP/Views/SliderView/SliderView';
import Presenter from '../../src/RangeSlider/MVP/Presenter';
import RangeSlider from '../../src/RangeSlider/RangeSlider';
import EventArgs from '../../src/RangeSlider/Events/EventArgs';
import IViewData from '../../src/RangeSlider/Data/IViewData';
import Vector from '../../src/RangeSlider/Helpers/Vector';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = RangeSlider.createRangeSlider(container);
});

describe('SliderView', function () {
  it('создание слайдера без шкалы', function () {
    presenter.viewManager.onSetViewData.invoke(new EventArgs<IViewData>({
      hasScale: false,
    }));

    const scaleElement = <HTMLElement>(container.querySelector('.range-slider__scale-container'));
    assert.equal(scaleElement, null);
  });

  it('calculateProportionalValue с курсором у основания контейнера слайдера', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);
    presenter.viewManager.data.sliderLength = 1000;
    const cursorPositionInContainer = new Vector(0, 0);

    const actual = view.calculateProportionalValue(cursorPositionInContainer, 0);
    const expected = -100;

    assert.deepEqual(actual, expected);
  });

  it('calculateProportionalValue с курсором у основания контейнера слайдера и isHandlesSeparated = true', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);
    presenter.viewManager.data.sliderLength = 1000;
    presenter.viewManager.data.isHandlesSeparated = true;
    const cursorPositionInContainer = new Vector(0, 0);

    const actual = view.calculateProportionalValue(cursorPositionInContainer, 0);
    const expected = -100;

    assert.deepEqual(actual, expected);
  });

  it('calculateProportionalValue с курсором в центре контейнера слайдера и без передачи handleCountNumber', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);
    presenter.viewManager.data.sliderLength = 1000;
    const cursorPositionInContainer = new Vector(500, 0);

    const actual = view.calculateProportionalValue(cursorPositionInContainer);
    const expected = 0;

    assert.deepEqual(actual, expected);
  });

  it('calculateProportionalValue с курсором в центре контейнера слайдера, isHandlesSeparated = true и без передачи handleCountNumber', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);
    presenter.viewManager.data.sliderLength = 1000;
    presenter.viewManager.data.isHandlesSeparated = true;
    const cursorPositionInContainer = new Vector(500, 0);

    const actual = view.calculateProportionalValue(cursorPositionInContainer);
    const expected = 0;

    assert.deepEqual(actual, expected);
  });

  it('calculateMouseGlobalPosition для тачпада', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);

    const eventArg = new TouchEvent('touchmove', {
      changedTouches: [
        new Touch({
          pageX: 0,
          pageY: 0,
          identifier: 0,
          target: document.createElement('div'),
        }),
      ],
    });
    const actual = view.calculateMouseGlobalPosition(eventArg);
    const expected = new Vector(0, document.documentElement.clientHeight + window.pageYOffset);

    assert.deepEqual(actual, expected);
  });

  it('calculateMouseGlobalPosition для мыши', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);

    const eventArg = new MouseEvent('mousemove', {
      clientX: 0,
      clientY: 0,
    });
    const actual = view.calculateMouseGlobalPosition(eventArg);
    const expected = new Vector(0, document.documentElement.clientHeight + window.pageYOffset);

    assert.deepEqual(actual, expected);
  });

  it('calculateMousePositionInsideContainer', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);

    const actual = view.calculateMousePositionInsideContainer(new Vector(0, document.documentElement.clientHeight + window.pageYOffset), new Vector(0, 0));
    const expected = new Vector(0, 0);

    assert.deepEqual(actual, expected);
  });

  it('calculateMousePositionInsideContainer без mousePositionInsideTargetSlider', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);

    const actual = view.calculateMousePositionInsideContainer(new Vector(0, document.documentElement.clientHeight + window.pageYOffset));
    const expected = new Vector(0, 0);

    assert.deepEqual(actual, expected);
  });

  it('обновление', function () {
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

  it('срабатывают клики по сегментам c несколькими одинаковыми значениями', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);
    const segments = Array.from(view.containerElement.querySelectorAll('.range-slider__scale-segment'));

    const spy = jasmine.createSpy();
    for (let i = 0; i < segments.length; i += 1) {
      segments[i].addEventListener('click', spy);
      const eventClick = new window.Event('click', { bubbles: true });
      segments[i].dispatchEvent(eventClick);
    }

    const callsCount = spy.calls.count();
    assert.equal(callsCount, 11);
  });

  it('срабатывают клики по левому сегменту c несколькими одинаковыми значениями', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);
    const segments = Array.from(view.containerElement.querySelectorAll('.range-slider__scale-segment'));

    const spy = jasmine.createSpy();
    segments[0].addEventListener('click', spy);
    const eventClick = new window.Event('click', { bubbles: true });
    segments[0].dispatchEvent(eventClick);


    const callsCount = spy.calls.count();
    assert.equal(callsCount, 1);
  });

  it('срабатывают клики по правому сегменту c несколькими одинаковыми значениями', function () {
    const view = <SliderView>(presenter.viewManager.views[0]);
    const segments = Array.from(view.containerElement.querySelectorAll('.range-slider__scale-segment'));

    const spy = jasmine.createSpy();
    segments[segments.length - 1].addEventListener('click', spy);
    const eventClick = new window.Event('click', { bubbles: true });
    segments[segments.length - 1].dispatchEvent(eventClick);

    const callsCount = spy.calls.count();
    assert.equal(callsCount, 1);
  });
});