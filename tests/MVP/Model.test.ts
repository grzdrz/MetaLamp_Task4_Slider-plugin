import RangeSlider from "../../src/RangeSlider/RangeSlider";
import ModelDataEventArgs from "../../src/RangeSlider/Events/ModelDataEventArgs";

describe("Model", function () {
    it("validateValues без data.values", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const oldData = new ModelDataEventArgs({});
        presenter.model.getData(oldData);

        presenter.model.update({
            stepSize: 5,
            maxValue: 10,
            minValue: 0,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(oldData.data.values, newData.data.values);
    });

    it("validateValues без изменения значений", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        const oldData = new ModelDataEventArgs({});
        presenter.model.getData(oldData);

        presenter.model.update({
            values: oldData.data.values,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.values, oldData.data.values);
    });

    it("validateValues с изменением до 1го значения", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            values: [0],
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.values, [0]);
    });

    it("validateValues с изменением более 1го значения вперед направлении", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            canPush: false,
            values: [0, 30],
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.values, [0, 30]);
    });

    it("validateValues с изменением более 1го значения вперед направлении с проталкиванием вперед", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            canPush: true,
            values: [10, 0],
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.values, [10, 10]);
    });

    it("validateValues с изменением более 1го значения назад направлении с проталкиванием назад", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            canPush: true,
            values: [0, -10],
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.values, [-10, -10]);
    });

    it("validateValues с изменением более 1го значения вперед с выходом за максимальное значение", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            canPush: true,
            values: [0, 110],
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.values, [0, 100]);
    });

    it("validateValues с изменением более 1го значения назад с выходом за минимальное значение", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            canPush: true,
            values: [-110, 0],
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.values, [-100, 0]);
    });

    it("validateMaxValue", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            maxValue: 50,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.maxValue, 50);
    });

    it("validateMaxValue с попыткой установить значение не кратное шагу", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            maxValue: 109,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.maxValue, 110);
    });

    it("validateMaxValue с попыткой зайти за минимальное значение", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            maxValue: -110,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.maxValue, -90);
    });

    it("validateMinValue", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            minValue: -50,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.minValue, -50);
    });

    it("validateMinValue с попыткой установить значение не кратное шагу", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            minValue: -109,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.minValue, -110);
    });

    it("validateMinValue с попыткой зайти за максимально значение", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            minValue: 110,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.minValue, 90);
    });

    it("calculateNearestPositionForHandle с минимальным значение больше 0", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            stepSize: 1,
        });
        presenter.model.update({
            maxValue: 11,
        });
        presenter.model.update({
            minValue: 1,
        });

        const data1 = new ModelDataEventArgs({});
        presenter.model.getData(data1);
        if (data1.data.values) data1.data.values[1] = 12;
        presenter.model.update({
            values: data1.data.values,
        });

        const data2 = new ModelDataEventArgs({});
        presenter.model.getData(data2);
        if (data2.data.values) data2.data.values[0] = 0;
        presenter.model.update({
            values: data2.data.values,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.stepSize, 1);
        assert.deepEqual(newData.data.maxValue, 11);
        assert.deepEqual(newData.data.minValue, 1);
        assert.deepEqual(newData.data.values, [1, 11]);
    });

    it("calculateNearestPositionForHandle с минимальным значение меньше 0", function () {
        const container = document.createElement("div");
        const presenter = RangeSlider.createRangeSlider(container, {}, {});

        presenter.model.update({
            stepSize: 1,
        });
        presenter.model.update({
            maxValue: 11,
        });
        presenter.model.update({
            minValue: -1,
        });

        const data1 = new ModelDataEventArgs({});
        presenter.model.getData(data1);
        if (data1.data.values) data1.data.values[1] = 12;
        presenter.model.update({
            values: data1.data.values,
        });

        const data2 = new ModelDataEventArgs({});
        presenter.model.getData(data2);
        if (data2.data.values) data2.data.values[0] = -2;
        presenter.model.update({
            values: data2.data.values,
        });

        const newData = new ModelDataEventArgs({});
        presenter.model.getData(newData);

        assert.deepEqual(newData.data.stepSize, 1);
        assert.deepEqual(newData.data.maxValue, 11);
        assert.deepEqual(newData.data.minValue, -1);
        assert.deepEqual(newData.data.values, [-1, 11]);
    });
});