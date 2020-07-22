import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ModelDataEventArgs from "../../../../Events/ModelDataEventArgs";

class MaxValue extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerMaxValueChange = this.handlerMaxValueChange.bind(this);
    }

    public build(): void {
        super.build();

        const modelData = this.view.viewManager.getModelData();

        // максимальное значение
        const maxValueLabel = document.createElement("label");
        const maxValueInput = document.createElement("input");
        const maxValueText = document.createElement("p");

        maxValueLabel.className = "range-slider__inputs-label";

        maxValueInput.type = "number";
        maxValueInput.step = modelData.stepSize.toString();
        maxValueInput.value = modelData.maxValue.toString();
        maxValueInput.max = (modelData.maxValue + modelData.stepSize).toString();
        maxValueInput.min = (modelData.minValue - modelData.stepSize).toString();
        maxValueInput.className = "range-slider__max-value-input";

        maxValueText.className = "range-slider__max-value-text";
        maxValueText.textContent = "max value";

        maxValueLabel.append(maxValueInput);
        maxValueLabel.append(maxValueText);

        maxValueLabel.addEventListener("change", this.handlerMaxValueChange);

        this.DOMElement.append(maxValueLabel);
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const modelData = this.view.viewManager.getModelData();

        const input = <HTMLInputElement> this.DOMElement.querySelector(".range-slider__max-value-input");
        input.step = modelData.stepSize.toString();
        input.value = modelData.maxValue.toString();
        input.max = (modelData.maxValue + modelData.stepSize).toString();
        input.min = (modelData.minValue - modelData.stepSize).toString();
    }

    private handlerMaxValueChange(event: globalThis.Event) {
        event.preventDefault();

        const currentLabel = event.currentTarget;
        if (!currentLabel) throw new Error("some shit with max value change event");
        const input = (<HTMLInputElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        const inputValue = Number.parseFloat(input.value);

        const optionsToUpdate = {
            maxValue: inputValue,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ModelDataEventArgs(optionsToUpdate));
    }
}

export default MaxValue;
