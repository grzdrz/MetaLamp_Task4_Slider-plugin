import RangeSlider from "../../src/RangeSlider/RangeSlider";
import ViewDataEventArgs from "../../src/RangeSlider/Events/ViewDataEventArgs";

describe("ViewManager", function () {
    it("обновление viewManager без указания данных", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const oldData = new ViewDataEventArgs({});
        presenter.viewManager.getData(oldData);

        presenter.viewManager.update({});

        const newData = new ViewDataEventArgs({});
        presenter.viewManager.getData(newData);

        assert.equal(oldData.data.angle, newData.data.angle);
        assert.equal(oldData.data.borderThickness, newData.data.borderThickness);
        assert.deepStrictEqual(oldData.data.filledStrips, newData.data.filledStrips);
        assert.equal(oldData.data.handleHeight, newData.data.handleHeight);
        assert.equal(oldData.data.handleWidth, newData.data.handleWidth);
        assert.equal(oldData.data.hasScale, newData.data.hasScale);
        assert.equal(oldData.data.isHandlesSeparated, newData.data.isHandlesSeparated);
        assert.equal(oldData.data.maxSegmentsCount, newData.data.maxSegmentsCount);
        assert.equal(oldData.data.tooltipMargin, newData.data.tooltipMargin);
        assert.equal(oldData.data.scaleMargin, newData.data.scaleMargin);
        assert.equal(oldData.data.sliderLength, newData.data.sliderLength);
        assert.equal(oldData.data.sliderStripThickness, newData.data.sliderStripThickness);
    });

    it("валидация угла при передачи в update более 90 градусов", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.viewManager.update({
            angle: 91,
        });

        const updatedData = new ViewDataEventArgs({});
        presenter.viewManager.getData(updatedData);

        assert.equal(updatedData.data.angle, 90);
    });

    it("валидация угла при передачи в update менее 0 градусов", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.viewManager.update({
            angle: -1,
        });

        const updatedData = new ViewDataEventArgs({});
        presenter.viewManager.getData(updatedData);

        assert.equal(updatedData.data.angle, 0);
    });

    it("валидация численности интервальных полос при большей численности значений", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.viewManager.update({
            filledStrips: [true],
        });

        const updatedData = new ViewDataEventArgs({});
        presenter.viewManager.getData(updatedData);

        assert.deepEqual(updatedData.data.filledStrips, [true, false, false]);
    });
});