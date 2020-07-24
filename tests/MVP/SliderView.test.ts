import RangeSlider from "../../src/RangeSlider/RangeSlider";
import ViewDataEventArgs from "../../src/RangeSlider/Events/ViewDataEventArgs";
import SliderView from "../../src/RangeSlider/MVP/Views/SliderView/SliderView";
import Vector from "../../src/RangeSlider/Helpers/Vector";

describe("SliderView", function () {
    it("создание слайдера без шкалы", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({
            hasScale: false,
        }));

        const scaleElement = <HTMLElement>(container.querySelector(".range-slider__scale-container"));

        assert.equal(scaleElement, null);
    });

    it("calculateProportionalValue с дефолтными настройками и курсором у основания контейнера слайдера", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <SliderView>(presenter.viewManager.views[0]);

        const cursorPositionInContainer = new Vector(0, 0);
        view.calculateProportionalValue(cursorPositionInContainer, 0);

        const data = presenter.viewManager.getModelData();

        assert.deepEqual(data.values, [-100, 0]);
    });

    it("calculateProportionalValue с разделенными ползунками и курсором у основания контейнера слайдера", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <SliderView>(presenter.viewManager.views[0]);

        presenter.viewManager.update({
            isHandlesSeparated: true,
        });

        const cursorPositionInContainer = new Vector(0, 0);
        view.calculateProportionalValue(cursorPositionInContainer, 0);

        const data = presenter.viewManager.getModelData();

        assert.deepEqual(data.values, [-100, 0]);
    });
});