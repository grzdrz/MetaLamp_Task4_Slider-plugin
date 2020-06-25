/* import { SliderView } from "./View.js";
import { Model } from "./Model.js"; */

/* import { SlidersContainer } from "../elements/SlidersContainer.js";
import { Slider } from "../elements/Slider.js";
import { FilledStrip } from "../elements/FilledStrip.js";
import { EmptyStrip } from "../elements/EmptyStrip.js"; */

export class Controller {
    constructor(model, sliderView, inputsView) {
        this.model = model;
        this.sliderView = sliderView;
        this.inputsView = inputsView;

        this.getModelData = this.getModelData.bind(this);
        this.sliderView.getModelData = this.getModelData;

        this.updateInputValues = this.updateInputValues.bind(this);
        this.sliderView.updateInputValues = this.updateInputValues;
        this.updateInputValues2 = this.updateInputValues2.bind(this);
        this.inputsView.updateInputValues2 = this.updateInputValues2;


        this.model.updateModelData = this.updateModelData;

        this.inputsView.updateInputs = this.updateInputs;


        this.sliderView.update = this.update.bind(this);
        this.initialize();
    }

    initialize() {
        this.sliderView.initialize();
        this.inputsView.initialize();
    }

    update() {
        //рассылка
    }

    getModelData() {
        return this.model.options;
    }

    updateInputValues(data) {
        this.model.updateModelData(data);
        this.inputsView.updateInputs(data);
    }
    updateInputValues2(data) {
        this.model.updateModelData(data);
        this.sliderView.updateSlider();
    }

    updateModelData(data) {
        data.firstValue ? this.options.firstValue = data.firstValue : this.options.firstValue;
        data.lastValue ? this.options.lastValue = data.lastValue : this.options.lastValue;
    }

    updateInputs(data) {
        data.firstValue ? this.firstInputDOMElement.value = data.firstValue : this.firstInputDOMElement.value;
        data.lastValue ? this.lastInputDOMElement.value = data.lastValue : this.lastInputDOMElement.value;
    }

/*     updateSlider(data){

    } */
}


/* let slidersContainerWidth = elements.slidersContainer.getBoundingClientRect().width;
            let sliderWidth = elements.firstSlider.getBoundingClientRect().width;
            let filledStripBoundingRect = elements.filledStrip.getBoundingClientRect();
            let emptyStripSizeBoundingRect = elements.emptyStrip.getBoundingClientRect();
let inputMaxValue = this.model.options.maxValue;
let inputMinValue = this.model.options.minValue;

let dSliderInputFullValue = inputMaxValue - inputMinValue;
let dSliderStripFullValue = slidersContainerWidth - sliderWidth * 2;


let x1_slider = ((elements.firstInput.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue;
let x2_slider = (((elements.lastInput.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue) + sliderWidth;


this.view.setLeftMargin(elements.firstSlider, x1_slider)
this.view.setLeftMargin(elements.lastSlider, x2_slider);
this.view.setLeftMargin(elements.firstSliderBorder, x1_slider - 2);
this.view.setLeftMargin(elements.lastSliderBorder, x2_slider - 2);
this.view.setWidth(elements.filledStrip, x2_slider - x1_slider);
this.view.setLeftMargin(elements.filledStrip, x1_slider + sliderWidth / 2); */