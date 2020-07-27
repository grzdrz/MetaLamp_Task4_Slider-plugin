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

    it("обновление", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({
            isHandlesSeparated: true,
            hasTooltip: false,
            filledStrips: [true, true, true],
        }));
        /* presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({
            filledStrips: [true, true, true],
        })); */

        const data1 = new ViewDataEventArgs({});
        presenter.viewManager.getData(data1);

        assert.deepEqual(data1.data.filledStrips, [true, true, true]);


        presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({
            isHandlesSeparated: false,
        }));
        presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({
            filledStrips: [true, true, true],
        }));

        const data2 = new ViewDataEventArgs({});
        presenter.viewManager.getData(data2);

        assert.deepEqual(data2.data.filledStrips, [true, true, true]);
    });

    it("срабатывают клики по сегментам c несколькими одинаковыми значениями", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <SliderView>(presenter.viewManager.views[0]);
        const segments = Array.from(view.containerElement.querySelectorAll(".range-slider__scale-segment"));

        const spy = jasmine.createSpy();
        for (let i = 0; i < segments.length; i += 1) {
            segments[i].addEventListener("click", spy);
            const eventClick = new window.Event("click", { bubbles: true });
            segments[i].dispatchEvent(eventClick);
        }

        const callsCount = spy.calls.count();

        assert.equal(callsCount, 11);
    });

    it("срабатывают клики по левому сегменту c несколькими одинаковыми значениями", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <SliderView>(presenter.viewManager.views[0]);
        const segments = Array.from(view.containerElement.querySelectorAll(".range-slider__scale-segment"));

        const spy = jasmine.createSpy();
        segments[0].addEventListener("click", spy);
        const eventClick = new window.Event("click", { bubbles: true });
        segments[0].dispatchEvent(eventClick);


        const callsCount = spy.calls.count();

        assert.equal(callsCount, 1);
    });

    it("срабатывают клики по правому сегменту c несколькими одинаковыми значениями", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const view = <SliderView>(presenter.viewManager.views[0]);
        const segments = Array.from(view.containerElement.querySelectorAll(".range-slider__scale-segment"));

        const spy = jasmine.createSpy();
        segments[segments.length - 1].addEventListener("click", spy);
        const eventClick = new window.Event("click", { bubbles: true });
        segments[segments.length - 1].dispatchEvent(eventClick);


        const callsCount = spy.calls.count();

        assert.equal(callsCount, 1);
    });
});