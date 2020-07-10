import { OptionPanelElement } from "./OptionPanelElement";
import { OptionsPanelView } from "../OptionsPanelView";
import { OptionsToUpdateEventArgs } from "../../../Events/EventArgs";

export class StepSize extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerStepSizeChange = this.handlerStepSizeChange.bind(this);
    }

    build() {
        super.build();

        let modelData = this.view.getModelData();

        let stepSizeLabel = document.createElement("label");
        let stepSizeInput = document.createElement("input");
        let stepSizeText = document.createElement("p");

        stepSizeLabel.className = "range-slider__inputs-label";

        stepSizeInput.type = "number";
        stepSizeInput.step = "1";
        stepSizeInput.value = modelData.stepSize.toString();
        stepSizeInput.className = "range-slider__step-size-input";

        stepSizeText.className = "range-slider__step-size-text";
        stepSizeText.textContent = "step size";

        stepSizeLabel.append(stepSizeInput);
        stepSizeLabel.append(stepSizeText);

        stepSizeLabel.addEventListener("change", this.handlerStepSizeChange);

        this.DOMElement.append(stepSizeLabel);
        this.view.containerElement.append(this.DOMElement);
    }

    update() {
        let modelData = this.view.getModelData();

        let input = <HTMLInputElement>this.DOMElement.querySelector(".range-slider__step-size-input");
        input.value = modelData.stepSize.toString();
    }

    private handlerStepSizeChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with step size change event");
        let input = (<HTMLInputElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        let inputValue = Number.parseFloat(input.value);
        if (inputValue <= 0) {/////
            inputValue = 0.000001;
            input.value = inputValue.toString();
        }

        let optionsToUpdate = {
            stepSize: inputValue,
        };

        this.view.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}