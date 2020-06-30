import { View } from "./View.js";

export class OptionsPanelView extends View {
    constructor(baseModelData, containerElement) {
        super();
        this.containerElement = containerElement;

        this._handlerStepSizeChange = this._handlerStepSizeChange.bind(this);

        this.getModelData = () => { };
        this.onStepSizeChange = () => { };
    }

    initialize() {
        this._render();
    }

    _render() {
        let modelData = this.getModelData();

        let stepSizeLabel = document.createElement("label");
        stepSizeLabel.className = "range-slider__inputs-label";

        let stepSizeInput = document.createElement("input");
        stepSizeInput.type = "number";
        stepSizeInput.step = "0.5";
        stepSizeInput.value = modelData.stepSize;
        stepSizeInput.className = "range-slider__step-size-input";

        let stepSizeText = document.createElement("p");
        stepSizeText.className = "range-slider__step-size-text";
        stepSizeText.textContent = "step size";

        stepSizeLabel.append(stepSizeInput);
        stepSizeLabel.append(stepSizeText);

        stepSizeLabel.addEventListener("change", this._handlerStepSizeChange);
        this.containerElement.append(stepSizeLabel);
    }

    _handlerStepSizeChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let input = currentLabel.querySelector("input");
        let inputValue = Number.parseFloat(input.value);

        let optionsToUpdate = {
            stepSize: inputValue,
        };
        this.onStepSizeChange(optionsToUpdate);
    }
}