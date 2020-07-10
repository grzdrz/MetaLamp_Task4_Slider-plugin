import { OptionPanelElement } from "./OptionPanelElement";
import { OptionsPanelView } from "../OptionsPanelView";
import { OptionsToUpdateEventArgs } from "../../../Events/EventArgs";

export class MinValue extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerMinValueChange = this.handlerMinValueChange.bind(this);
    }

    build() {
        super.build();

        let modelData = this.view.getModelData();

        let minValueLabel = document.createElement("label");
        let minValueInput = document.createElement("input");
        let minValueText = document.createElement("p");

        minValueLabel.className = "range-slider__inputs-label";

        minValueInput.type = "number";
        minValueInput.step = modelData.stepSize.toString();
        minValueInput.value = modelData.minValue.toString();
        minValueInput.className = "range-slider__min-value-input";

        minValueText.className = "range-slider__min-value-text";
        minValueText.textContent = "min value";

        minValueLabel.append(minValueInput);
        minValueLabel.append(minValueText);

        minValueLabel.addEventListener("change", this.handlerMinValueChange);

        this.DOMElement.append(minValueLabel);
        this.view.containerElement.append(this.DOMElement);
    }

    update() {
        let modelData = this.view.getModelData();

        let input = <HTMLInputElement>this.DOMElement.querySelector(".range-slider__min-value-input");
        input.step = modelData.stepSize.toString();
        input.value = modelData.minValue.toString();
    }

    private handlerMinValueChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with min value change event");
        let input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        let inputValue = Number.parseFloat(input.value);

        let optionsToUpdate = {
            minValue: inputValue,
        };

        this.view.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}