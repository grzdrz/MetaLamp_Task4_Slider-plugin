/* import { SliderView } from "./View.js";
import { Model } from "./Model.js"; */

/* import { SlidersContainer } from "../elements/SlidersContainer.js";
import { Slider } from "../elements/Slider.js";
import { FilledStrip } from "../elements/FilledStrip.js";
import { EmptyStrip } from "../elements/EmptyStrip.js"; */

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.update = this.update.bind(this);

        this.getModelData = this.getModelData.bind(this);
        this.view.getModelData = this.getModelData;

        this.initialize();
    }

    initialize() {
        this.view.updatePositions();
    }

    update() {
        //рассылка
    }

    getModelData(){
        return this.model.options;
    }
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