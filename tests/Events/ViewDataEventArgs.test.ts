import ViewDataEventArgs from "../../src/RangeSlider/Events/ViewDataEventArgs";
import ViewData from "../../src/RangeSlider/MVP/Views/Data/ViewData";

describe("ViewDataEventArgs", function () {
    const defaultViewData = new ViewData({});
    const eventArgs = new ViewDataEventArgs(defaultViewData);

    it("Создание экземмпляра ViewDataEventArgs", function () {
        assert.instanceOf(eventArgs, ViewDataEventArgs);
    });

    it("установка данных",
        function () {
            const actual1 = eventArgs.data;
            const expected1 = defaultViewData;
            assert.equal(actual1, expected1);
        }
    );
});