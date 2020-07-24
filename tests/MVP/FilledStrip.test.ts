import RangeSlider from "../../src/RangeSlider/RangeSlider";
import ViewDataEventArgs from "../../src/RangeSlider/Events/ViewDataEventArgs";
import SliderView from "../../src/RangeSlider/MVP/Views/SliderView/SliderView";

describe("FilledStrip", function () {
    it("обновление", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({
            isHandlesSeparated: true,
        }));
        presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({
            filledStrips: [true, true, true],
        }));

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

/*     it("длина последнего интервала с разделенными ползунками", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({
            isHandlesSeparated: false,
        }));
        presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({
            filledStrips: [true, true, true],
        }));

        const lastStrip = <HTMLElement>(container.querySelector(".range-slider__filled-strip_2"));
        assert.deepEqual(Number.parseInt(lastStrip.style.width), 549);
    }); */
});