import { View } from "./View.js";

export class OptionsPanelView extends View {
    constructor(containerElement) {
        super();
        this.containerElement = containerElement;

        this._handlerStepSizeChange = this._handlerStepSizeChange.bind(this);
        this._handlerOrientationChange = this._handlerOrientationChange.bind(this);

        this.update = this.update.bind(this);
        this.onStepSizeChange = () => { };
        this.onOrientationChange = () => { };
    }

    initialize() {
        this._render();
    }

    update() {
        let modelData = this.getModelData();
        if (modelData.orientation === "horizontal") {
            this.containerElement.classList.remove("range-slider__options-panel-container_vertical");
            this.containerElement.classList.add("range-slider__options-panel-container_horizontal");
        }
        else {
            this.containerElement.classList.remove("range-slider__options-panel-container_horizontal");
            this.containerElement.classList.add("range-slider__options-panel-container_vertical");
        }
    }

    _render() {
        let modelData = this.getModelData();

        //размер шага
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

        //вериткально/горизонтольно
        let orientationLabel = document.createElement("label");
        orientationLabel.className = "range-slider__inputs-label";

        let orientationInput = document.createElement("input");
        orientationInput.type = "checkbox";
        orientationInput.checked = modelData.orientation === "horizontal";
        orientationInput.className = "range-slider__orientation-input";

        let orientationText = document.createElement("p");
        orientationText.className = "range-slider__orientation-text";
        orientationText.textContent = "orientation";

        orientationLabel.append(orientationInput);
        orientationLabel.append(orientationText);

        orientationLabel.addEventListener("change", this._handlerOrientationChange);

        this.containerElement.append(stepSizeLabel);
        this.containerElement.append(orientationLabel);
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

    _handlerOrientationChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        /* if (currentLabel.checked) */

        this.onOrientationChange();
    }
}