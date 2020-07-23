import ModelDataEventArgs from "../../src/RangeSlider/Events/ModelDataEventArgs";
import ModelData from "../../src/RangeSlider/MVP/Model/Data/ModelData";

describe("ModelDataEventArgs", function () {
    const defaultModelData = new ModelData({});
    const eventArgs = new ModelDataEventArgs(defaultModelData);

    it("Создание экземмпляра ModelDataEventArgs", function () {
        assert.instanceOf(eventArgs, ModelDataEventArgs);
    });

    it("установка данных",
        function () {
            const actual1 = eventArgs.data;
            const expected1 = defaultModelData;
            assert.equal(actual1, expected1);
        }
    );
});