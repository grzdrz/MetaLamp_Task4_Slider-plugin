import { View } from "./View.js";

export class OptionsPanelView extends View {
    constructor(containerElement) {
        super();
        this.containerElement = containerElement;

        this._handlerStepSizeChange = this._handlerStepSizeChange.bind(this);
        this._handlerMaxValueChange = this._handlerMaxValueChange.bind(this);
        this._handlerMinValueChange = this._handlerMinValueChange.bind(this);
        this._handlerHandlesCountChange = this._handlerHandlesCountChange.bind(this);
        this._handlerMaxSegmentsCountChange = this._handlerMaxSegmentsCountChange.bind(this);
        this._handlerAngleSizeChange = this._handlerAngleSizeChange.bind(this);

        this.update = this.update.bind(this);
        this.onModelStateUpdate = () => { };
    }

    initialize() {
        this._render();
    }

    update() {
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

        let maxSegmentsCountLabel = document.createElement("label");
        {
            maxSegmentsCountLabel.className = "range-slider__inputs-label";

            let maxSegmentsCountInput = document.createElement("input");
            maxSegmentsCountInput.type = "number";
            maxSegmentsCountInput.step = "1";
            maxSegmentsCountInput.value = modelData.maxSegmentsCount;
            maxSegmentsCountInput.className = "range-slider__max-value-input";

            let maxSegmentsCountText = document.createElement("p");
            maxSegmentsCountText.className = "range-slider__max-value-text";
            maxSegmentsCountText.textContent = "maximum segments count";

            maxSegmentsCountLabel.append(maxSegmentsCountInput);
            maxSegmentsCountLabel.append(maxSegmentsCountText);

            maxSegmentsCountLabel.addEventListener("change", this._handlerMaxSegmentsCountChange);
        }

        let angleSizeLabel = document.createElement("label");
        {
            angleSizeLabel.className = "range-slider__inputs-label";

            let angleSizeCountInput = document.createElement("input");
            angleSizeCountInput.type = "number";
            angleSizeCountInput.step = "1";
            angleSizeCountInput.value = modelData.angle;
            angleSizeCountInput.className = "range-slider__angle-size-input";

            let angleSizeCountText = document.createElement("p");
            angleSizeCountText.className = "range-slider__angle-size-text";
            angleSizeCountText.textContent = "angle size";

            angleSizeLabel.append(angleSizeCountInput);
            angleSizeLabel.append(angleSizeCountText);

            angleSizeLabel.addEventListener("change", this._handlerAngleSizeChange);
        }


        this.containerElement.append(stepSizeLabel);
        this.containerElement.append(maxValueLabel);
        this.containerElement.append(minValueLabel);
        this.containerElement.append(handlesCountContainer);
        this.containerElement.append(maxSegmentsCountLabel);
        this.containerElement.append(angleSizeLabel);
    }

    _handlerStepSizeChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let input = currentLabel.querySelector("input");
        let inputValue = Number.parseFloat(input.value);
        if (inputValue <= 0) {
            inputValue = 0.1;
            input.value = inputValue;
        }

        let optionsToUpdate = {
            stepSize: inputValue,
        };
        this.onModelStateUpdate(optionsToUpdate);
    }

    _handlerMaxValueChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let input = currentLabel.querySelector("input");
        let inputValue = Number.parseFloat(input.value);

        let optionsToUpdate = {
            maxValue: inputValue,
        };
        this.onModelStateUpdate(optionsToUpdate);
    }
    _handlerMinValueChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let input = currentLabel.querySelector("input");
        let inputValue = Number.parseFloat(input.value);

        let optionsToUpdate = {
            minValue: inputValue,
        };
        this.onModelStateUpdate(optionsToUpdate);
    }
    _handlerHandlesCountChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let handlesCount = currentLabel.dataset.handlesCount;

        let optionsToUpdate;
        if (Number.parseInt(handlesCount) === 1) {
            optionsToUpdate = {
                hasTwoSlider: false,
            };
        }
        else {
            optionsToUpdate = {
                hasTwoSlider: true,
            };
        }

        this.onModelStateUpdate(optionsToUpdate);
    }
    _handlerMaxSegmentsCountChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let input = currentLabel.querySelector("input");
        let inputValue = Number.parseInt(input.value);

        let optionsToUpdate = {
            maxSegmentsCount: inputValue,
        };
        this.onModelStateUpdate(optionsToUpdate);
    }
    _handlerAngleSizeChange(event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        let input = currentLabel.querySelector("input");
        let inputValue = Number.parseInt(input.value);

        let optionsToUpdate = {
            angle: inputValue,
        };
        this.onModelStateUpdate(optionsToUpdate);
    }
}