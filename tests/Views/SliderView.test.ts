import SliderView from '../../src/RangeSlider/Views/SliderView/SliderView';
import Presenter from '../../src/RangeSlider/Presenter';
import Vector from '../../src/RangeSlider/Helpers/Vector';
import createRangeSlider from '../../src/RangeSlider/createRangeSlider';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = createRangeSlider(container);
});

describe('SliderView', function () {
  describe('calculateMouseGlobalPosition', function () {
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
  });

  describe('calculateMousePositionInsideContainer', function () {
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
  });
});