/* import RangeSlider from "../../src/RangeSlider/RangeSlider";
import OptionsPanelView from "../../src/RangeSlider/MVP/Views/OptionsPanel/OptionsPanelView";

describe("OptionsPanelView", function () {
    it("обработчики вызваются корректно", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <OptionsPanelView>(presenter.viewManager.views[2]);
        const labels = Array.from(view.containerElement.querySelectorAll(".options__label"));

        const spy = jasmine.createSpy();
        for (let i = 0; i < labels.length; i += 1) {
            labels[i].addEventListener("change", spy);
            const eventClick = new window.Event('change', { bubbles: true });
            labels[i].dispatchEvent(eventClick);
        }

        const callsCount = spy.calls.count();
        assert.equal(callsCount, 12);
    });

    it("обработчик изменяющий численность значений вызвается корректно", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <OptionsPanelView>(presenter.viewManager.views[2]);
        const handlesCountContainer = <HTMLInputElement>(view.containerElement.querySelector(".js-options__handles-count-input"));
        handlesCountContainer.value = `${10}`;

        const spy = jasmine.createSpy();
        handlesCountContainer.addEventListener("change", spy);
        const eventClick = new window.Event('change', { bubbles: true });
        handlesCountContainer.dispatchEvent(eventClick);


        const callsCount = spy.calls.count();
        assert.equal(callsCount, 1);
    });

    it("обработчик изменяющий размер шага вызвается корректно при попытке выставить 0", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <OptionsPanelView>(presenter.viewManager.views[2]);
        const handlesCountContainer = <HTMLInputElement>(view.containerElement.querySelector(".js-options__step-size-input"));
        handlesCountContainer.value = `${0}`;

        const spy = jasmine.createSpy();
        handlesCountContainer.addEventListener("change", spy);
        const eventClick = new window.Event('change', { bubbles: true });
        handlesCountContainer.dispatchEvent(eventClick);


        const callsCount = spy.calls.count();
        assert.equal(callsCount, 1);
    });

    it("обработчики чекбоксов устанавливающих интервалы вызваются корректно", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <OptionsPanelView>(presenter.viewManager.views[2]);
        const labels = Array.from(view.containerElement.querySelectorAll(".js-options__filled-strips-checkbox-input"));

        const spy = jasmine.createSpy();
        for (let i = 0; i < labels.length; i += 1) {
            labels[i].addEventListener("change", spy);
            const eventClick = new window.Event('change', { bubbles: true });
            labels[i].dispatchEvent(eventClick);
        }

        const callsCount = spy.calls.count();
        assert.equal(callsCount, 3);
    });
}); */