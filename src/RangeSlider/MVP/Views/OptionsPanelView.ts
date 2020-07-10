import { View } from "./View";
import { Event } from "../../Events/Event";
import { OptionsToUpdateEventArgs, EventArgs } from "../../Events/EventArgs";

import { OptionPanelElement } from "./OptionsPanelElements/OptionPanelElement";
import { Angle } from "./OptionsPanelElements/Angle";
import { HandlsCount } from "./OptionsPanelElements/HandlsCount";
import { MaxSegmentCount } from "./OptionsPanelElements/MaxSegmentCount";
import { MaxValue } from "./OptionsPanelElements/MaxValue";
import { MinValue } from "./OptionsPanelElements/MinValue";
import { StepSize } from "./OptionsPanelElements/StepSize";

export class OptionsPanelView extends View {
    public onModelStateUpdate: Event = new Event();

    public containerElement: HTMLElement;

    public stepSize: StepSize;

    public panelElements: OptionPanelElement[] = new Array<OptionPanelElement>();

    constructor(containerElement: HTMLElement) {
        super();

        this.containerElement = containerElement;

        this.panelElements.push(this.stepSize = new StepSize(this));

        /* this._handlerStepSizeChange = this._handlerStepSizeChange.bind(this); */
        this._handlerMaxValueChange = this._handlerMaxValueChange.bind(this);
        this._handlerMinValueChange = this._handlerMinValueChange.bind(this);
        this._handlerHandlsCountChange = this._handlerHandlsCountChange.bind(this);
        this._handlerMaxSegmentsCountChange = this._handlerMaxSegmentsCountChange.bind(this);
        this._handlerAngleSizeChange = this._handlerAngleSizeChange.bind(this);

        this.update = this.update.bind(this);
    }

    initialize() {
        this.update(true);
    }

    update(neededFullRerender: boolean) {
        if (neededFullRerender) {
            this.panelElements.forEach(el => el.build());
        }
        else {
            this.panelElements.forEach(el => el.update());
        }
    }

/*     render(neededFullRerender: boolean) {
        let modelData = this.getModelData();


    } */

    build() {
        let modelData = this.getModelData();

        this.containerElement.innerHTML = "";

        //размер шага
        let stepSizeLabel = document.createElement("label");
        let stepSizeInput = document.createElement("input");
        let stepSizeText = document.createElement("p");
        {
            stepSizeLabel.className = "range-slider__inputs-label";

            stepSizeInput.type = "number";
            stepSizeInput.step = "1";
            stepSizeInput.value = modelData.stepSize.toString();
            stepSizeInput.className = "range-slider__step-size-input";

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
        let oneHandleInput = document.createElement("input");
        let oneHandleText = document.createElement("p");
        let twoHandlesInput = document.createElement("input");
        let twoHandlesText = document.createElement("p");
        {
            handlesCountContainer.className = "range-slider__handles-count-container";

            //1 ползунок
            oneHandleLabel.className = "range-slider__inputs-label";
            oneHandleLabel.dataset.handlesCount = "1";


            oneHandleInput.name = "handlesCount_" + modelData.id;
            oneHandleInput.type = "radio";
            oneHandleInput.checked = !modelData.hasTwoSlider;
            oneHandleInput.className = "range-slider__handles-count-input";


            oneHandleText.className = "range-slider__handles-count-text";
            oneHandleText.textContent = "one handle";

            oneHandleLabel.append(oneHandleInput);
            oneHandleLabel.append(oneHandleText);

            oneHandleLabel.addEventListener("change", this._handlerHandlsCountChange);

            //2 ползунка
            twoHandlesLabel.className = "range-slider__inputs-label";
            twoHandlesLabel.dataset.handlesCount = "2";


            twoHandlesInput.name = "handlesCount_" + modelData.id;
            twoHandlesInput.type = "radio";
            twoHandlesInput.checked = modelData.hasTwoSlider;
            twoHandlesInput.className = "range-slider__handles-count-input";


            twoHandlesText.className = "range-slider__handles-count-text";
            twoHandlesText.textContent = "two handles";

            twoHandlesLabel.append(twoHandlesInput);
            twoHandlesLabel.append(twoHandlesText);

            twoHandlesLabel.addEventListener("change", this._handlerHandlsCountChange);

            handlesCountContainer.append(oneHandleLabel);
            handlesCountContainer.append(twoHandlesLabel);
        }

        //максимальное значение
        let maxValueLabel = document.createElement("label");
        {
            maxValueLabel.className = "range-slider__inputs-label";

            let maxValueInput = document.createElement("input");
            maxValueInput.type = "number";
            maxValueInput.step = modelData.stepSize.toString();
            maxValueInput.value = modelData.maxValue.toString();
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
            minValueInput.step = modelData.stepSize.toString();
            /* minValueInput. */
            minValueInput.value = modelData.minValue.toString();
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
            maxSegmentsCountInput.value = modelData.maxSegmentsCount.toString();
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
            angleSizeCountInput.value = modelData.angle.toString();
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

    _handlerStepSizeChange(event: globalThis.Event) {
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
        //this.onModelStateUpdate(optionsToUpdate);
        this.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }

    _handlerMaxValueChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with max value change event");
        let input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        let inputValue = Number.parseFloat(input.value);

        let optionsToUpdate = {
            maxValue: inputValue,
        };

        this.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
    _handlerMinValueChange(event: globalThis.Event) {
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

        this.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
    _handlerHandlsCountChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with handls count change event");
        let handlesCount = (<HTMLElement>currentLabel).dataset.handlesCount;
        if (!handlesCount)
            throw new Error("some shit with handls count change event");

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

        this.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
    _handlerMaxSegmentsCountChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with max segments count change event");
        let input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        let inputValue = Number.parseInt(input.value);

        let optionsToUpdate = {
            maxSegmentsCount: inputValue,
        };

        this.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
    _handlerAngleSizeChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with angle size change event");
        let input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        let inputValue = Number.parseInt(input.value);

        let optionsToUpdate = {
            angle: inputValue,
        };

        this.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}