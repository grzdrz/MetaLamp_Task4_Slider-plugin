import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ModelDataEventArgs from "../../../../Events/ModelDataEventArgs";

class MinValue extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerMinValueChange = this.handlerMinValueChange.bind(this);
    }

    public build(): void {
        super.build();

        const modelData = this.view.getModelData();

        const minValueLabel = document.createElement("label");
        const minValueInput = document.createElement("input");
        const minValueText = document.createElement("p");

        minValueLabel.className = "range-slider__inputs-label";

        minValueInput.type = "number";
        minValueInput.step = modelData.stepSize.toString();
        minValueInput.value = modelData.minValue.toString();
        minValueInput.max = (modelData.maxValue + modelData.stepSize).toString();
        minValueInput.min = (modelData.minValue - modelData.stepSize).toString();
        minValueInput.className = "range-slider__min-value-input";

        minValueText.className = "range-slider__min-value-text";
        minValueText.textContent = "min value";

        minValueLabel.append(minValueInput);
        minValueLabel.append(minValueText);

        minValueLabel.addEventListener("change", this.handlerMinValueChange);

        this.DOMElement.append(minValueLabel);
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const modelData = this.view.getModelData();

        const input = <HTMLInputElement> this.DOMElement.querySelector(".range-slider__min-value-input");
        input.step = modelData.stepSize.toString();
        input.value = modelData.minValue.toString();
        input.max = (modelData.maxValue + modelData.stepSize).toString();
        input.min = (modelData.minValue - modelData.stepSize).toString();
    }

    private handlerMinValueChange(event: globalThis.Event) {
        event.preventDefault();

        const currentLabel = event.currentTarget;
        if (!currentLabel) throw new Error("some shit with min value change event");
        const input = (<HTMLInputElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        const inputValue = Number.parseFloat(input.value);

        const optionsToUpdate = {
            minValue: inputValue,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ModelDataEventArgs(optionsToUpdate));
    }
}

export default MinValue;
