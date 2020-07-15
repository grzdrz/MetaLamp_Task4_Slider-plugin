import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import OptionsToUpdateEventArgs from "../../../Events/OptionsToUpdateEventArgs";

class MaxValue extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerMaxValueChange = this.handlerMaxValueChange.bind(this);
    }

    build() {
        super.build();

        let modelData = this.view.getModelData();

        //максимальное значение
        let maxValueLabel = document.createElement("label");
        let maxValueInput = document.createElement("input");
        let maxValueText = document.createElement("p");

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

    update() {
        let modelData = this.view.getModelData();

        let input = <HTMLInputElement>this.DOMElement.querySelector(".range-slider__max-value-input");
        input.step = modelData.stepSize.toString();
        input.value = modelData.maxValue.toString();
        input.max = (modelData.maxValue + modelData.stepSize).toString();
        input.min = (modelData.minValue - modelData.stepSize).toString();
    }

    private handlerMaxValueChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with max value change event");
        let input = (<HTMLInputElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        let inputValue = Number.parseFloat(input.value);

        let optionsToUpdate = {
            maxValue: inputValue,
        };

        this.view.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}

export default MaxValue;
