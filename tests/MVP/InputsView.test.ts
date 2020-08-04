import RangeSlider from "../../src/RangeSlider/RangeSlider";
import InputsView from "../../src/RangeSlider/MVP/Views/InputsView/InputsView";

describe("InputsView", function () {
    it("build был вызван при обновлении с полным перерендером", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <InputsView>(presenter.viewManager.views[1]);
        const buildSpy = spyOn(view, "build");

        view.update(true);

        const callsCount = buildSpy.calls.count();

        assert.equal(callsCount, 1);
    });

    it("обработчики вызваются корректно", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <InputsView>(presenter.viewManager.views[1]);
        const input = <HTMLInputElement>(view.containerElement.querySelector(".range-slider__input_0"));

        const spy = jasmine.createSpy();
        input.addEventListener("change", spy);

        const eventClick = new window.Event('change', { bubbles: true });
        input.dispatchEvent(eventClick);

        const callsCount = spy.calls.count();
        assert.equal(callsCount, 1);
    });
});