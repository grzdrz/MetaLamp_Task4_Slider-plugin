import { View } from "./View.js";

export class OptionsPanelView extends View {
    constructor(containerElement) {
        super();
        this.containerElement = containerElement;

        this._handlerStepSizeChange = this._handlerStepSizeChange.bind(this);
        this._handlerOrientationChange = this._handlerOrientationChange.bind(this);
        this._handlerMaxValueChange = this._handlerMaxValueChange.bind(this);
        this._handlerMinValueChange = this._handlerMinValueChange.bind(this);
        this._handlerHandlesCountChange = this._handlerHandlesCountChange.bind(this);

        this.update = this.update.bind(this);
        this.onStepSizeChange = () => { };
        this.onOrientationChange = () => { };
        this.onMaxValueChange = () => { };
        this.onMinValueChange = () => { };
        this.onHandlesCountChange = () => { };
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
        {
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
        }

        //вериткально/горизонтольно
        let orientationLabel = document.createElement("label");
        {
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
        }

        //1 ползунок/2 ползунка
        let handlesCountContainer = document.createElement("div");
        let oneHandleLabel = document.createElement("label");
        let twoHandlesLabel = document.createElement("label");
        {
            handlesCountContainer.className = "range-slider__handles-count-container";

            //1 ползунок
            oneHandleLabel.className = "range-slider__inputs-label";
            oneHandleLabel.dataset.handlesCount = 1;

            let oneHandleInput = document.createElement("input");
            oneHandleInput.name = "handlesCount_" + modelData.id;
            oneHandleInput.type = "radio";
            oneHandleInput.checked = !modelData.hasTwoSlider;
            oneHandleInput.className = "range-slider__handles-count-input";

            let oneHandleText = document.createElement("p");
            oneHandleText.className = "range-slider__handles-count-text";
            oneHandleText.textContent = "one handle";

            oneHandleLabel.append(oneHandleInput);
            oneHandleLabel.append(oneHandleText);

            oneHandleLabel.addEventListener("change", this._handlerHandlesCountChange);

            //2 ползунка
            twoHandlesLabel.className = "range-slider__inputs-label";
            twoHandlesLabel.dataset.handlesCount = 2;

            let twoHandlesInput = document.createElement("input");
            twoHandlesInput.name = "handlesCount_" + modelData.id;
            twoHandlesInput.type = "radio";
            twoHandlesInput.checked = modelData.hasTwoSlider;
            twoHandlesInput.className = "range-slider__handles-count-input";

            let twoHandlesText = document.createElement("p");
            twoHandlesText.className = "range-slider__handles-count-text";
            twoHandlesText.textContent = "two handles";

            twoHandlesLabel.append(twoHandlesInput);
            twoHandlesLabel.append(twoHandlesText);

            twoHandlesLabel.addEventListener("change", this._handlerHandlesCountChange);

            handlesCountContainer.append(oneHandleLabel);
            handlesCountContainer.append(twoHandlesLabel);
        }

        //максимальное значение
        let maxValueLabel = document.createElement("label");
        {
            maxValueLabel.className = "range-slider__inputs-label";

            let maxValueInput = document.createElement("input");
            maxValueInput.type = "number";
            maxValueInput.step = "1";
            maxValueInput.value = modelData.maxValue;
            maxValueInput.className = "range-slider__max-value-input";

            let maxValueText = document.createElement("p");
            maxValueText.className = "range-slider__max-value-text";
            maxValueText.textContent = "max value";

            maxValueLabel.append(maxValueInput);
            maxValueLabel.append(maxValueText);

            maxValueLabel.addEventListener("change", this._handlerMaxValueChange);
        }

        //минимальное значение
        let minValueLabel = document.createElement("label");
        {
            minValueLabel.className = "range-slider__inputs-label";

            let minValueInput = document.createElement("input");
            minValueInput.type = "number";
            minValueInput.step = "1";
            minValueInput.value = modelData.minValue;
            minValueInput.className = "range-slider__min-value-input";

            let minValueText = document.createElement("p");
            minValueText.className = "range-slider__min-value-text";
            minValueText.textContent = "min value";

            minValueLabel.append(minValueInput);
            minValueLabel.append(minValueText);

            minValueLabel.addEventListener("change", this._handlerMinValueChange);
        }


        this.containerElement.append(stepSizeLabel);
        this.containerElement.append(maxValueLabel);
        this.containerElement.append(minValueLabel);
        this.containerElement.append(orientationLabel);
        this.containerElement.append(handlesCountContainer);
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
    _handlerMaxValueChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let input = currentLabel.querySelector("input");
        let inputValue = Number.parseFloat(input.value);

        let optionsToUpdate = {
            maxValue: inputValue,
        };
        this.onMaxValueChange(optionsToUpdate);
    }
    _handlerMinValueChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let input = currentLabel.querySelector("input");
        let inputValue = Number.parseFloat(input.value);

        let optionsToUpdate = {
            minValue: inputValue,
        };
        this.onMinValueChange(optionsToUpdate);
    }
    _handlerHandlesCountChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let handlesCount = currentLabel.dataset.handlesCount;
        if (Number.parseInt(handlesCount) === 1) {
            let optionsToUpdate = {
                hasTwoSlider: false,
            };
            this.onHandlesCountChange(optionsToUpdate);
        }
        else {
            let optionsToUpdate = {
                hasTwoSlider: true,
            };
            this.onHandlesCountChange(optionsToUpdate);
        }
    }
}