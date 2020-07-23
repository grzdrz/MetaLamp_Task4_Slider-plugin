import Event from "../../src/RangeSlider/Events/Event";

describe("Event", function () {
    it("Создание экземмпляра события", function () {
        const event = new Event();
        assert.instanceOf(event, Event);
    });

    it("subscribe, корректное назначение обработчиков",
        function () {
            const spy1 = jasmine.createSpy();
            const spy2 = jasmine.createSpy();
            const onIncreaseNumber = new Event();

            const subscribeSpy = spyOn(onIncreaseNumber, "subscribe");

            const actual1 = subscribeSpy.calls.count();
            const expected1 = 0;
            assert.equal(actual1, expected1);

            onIncreaseNumber.subscribe(spy1);
            onIncreaseNumber.subscribe(spy2);

            const actual2 = subscribeSpy.calls.count();
            const expected2 = 2;
            assert.equal(actual2, expected2);
        }
    );

    it("invoke, корректный вызов обработчиков",
        function () {
            let number = 0;
            const onIncreaseNumber = new Event();

            onIncreaseNumber.subscribe(() => {
                number += 1;
            });
            onIncreaseNumber.subscribe(() => {
                number += 2;
            });

            const actual1 = number;
            const expected1 = 0;
            assert.equal(actual1, expected1, "Несовпадение значений");

            onIncreaseNumber.invoke({});

            const actual2 = number;
            const expected2 = 3;
            assert.equal(actual2, expected2, "Несовпадение значений");
        }
    );
});