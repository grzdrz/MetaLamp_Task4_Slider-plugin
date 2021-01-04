import createRangeSlider from '../../src/RangeSlider/createRangeSlider';
import IHandleData from '../../src/RangeSlider/Data/IHandleData';
import Vector from '../../src/RangeSlider/Helpers/Vector';
import Presenter from '../../src/RangeSlider/Presenter';

let container: HTMLDivElement;
let presenter: Presenter;
beforeEach(() => {
  container = document.createElement('div');
  presenter = createRangeSlider(container);
});

describe('Model', function () {
  describe('calculateProportionalValue', function () {
    it('с курсором у основания контейнера слайдера', function () {
      const model = presenter.model;
      presenter.viewManager.data.sliderLength = 1000;
      const cursorPositionInContainer = new Vector(0, 0);
      const handleData: IHandleData = {
        mousePosition: cursorPositionInContainer,
        viewData: presenter.viewManager.data,
        id: 0,
      };

      const actual = model.calculateProportionalValue(handleData);
      const expected = -100;

      assert.equal(actual, expected);
    });

    it('с курсором у основания контейнера слайдера и isHandlesSeparated = true', function () {
      const model = presenter.model;
      presenter.viewManager.data.sliderLength = 1000;
      presenter.viewManager.data.isHandlesSeparated = true;
      const cursorPositionInContainer = new Vector(0, 0);
      const handleData: IHandleData = {
        mousePosition: cursorPositionInContainer,
        viewData: presenter.viewManager.data,
        id: 0,
      };

      const actual = model.calculateProportionalValue(handleData);
      const expected = -100;

      assert.equal(actual, expected);
    });

    it('с курсором в центре контейнера слайдера и без передачи id ползунка', function () {
      const model = presenter.model;
      presenter.viewManager.data.sliderLength = 1000;
      const cursorPositionInContainer = new Vector(500, 0);
      const handleData: IHandleData = {
        mousePosition: cursorPositionInContainer,
        viewData: presenter.viewManager.data,
      };

      const actual = model.calculateProportionalValue(handleData);
      const expected = 0;

      assert.equal(actual, expected);
    });

    it('с курсором в центре контейнера слайдера, isHandlesSeparated = true и без передачи handleCountNumber', function () {
      const model = presenter.model;
      presenter.viewManager.data.sliderLength = 1000;
      presenter.viewManager.data.isHandlesSeparated = true;
      const cursorPositionInContainer = new Vector(500, 0);
      const handleData: IHandleData = {
        mousePosition: cursorPositionInContainer,
        viewData: presenter.viewManager.data,
      };

      const actual = model.calculateProportionalValue(handleData);
      const expected = 0;

      assert.equal(actual, expected);
    });
  });

  describe('pullUpNearestValue', function () {
    it('c правым ближайшим значением', function(){
      const model = presenter.model;
      model.data.values

      debugger;
      const updatedValues = model.pullUpNearestValue(-10);

      const actual = updatedValues;
      const expected = [-10, 0];
      assert.deepEqual(actual, expected);
    })

    it('c левым ближайшим значением', function(){
      const model = presenter.model;
      model.data.values

      debugger;
      const updatedValues = model.pullUpNearestValue(10);

      const actual = updatedValues;
      const expected = [0, 10];
      assert.deepEqual(actual, expected);
    })
  });
});