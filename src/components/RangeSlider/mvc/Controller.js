export class Controller {
    constructor(model, sliderView, inputsView) {
        this.model = model;
        this.sliderView = sliderView;
        this.inputsView = inputsView;

        this.getModelData = this.getModelData.bind(this);
        this.sliderView.getModelData = this.getModelData;
        this.inputsView.getModelData = this.getModelData;

        this.updateInputs = this.updateInputs.bind(this);
        this.sliderView.updateInputs = this.updateInputs;

        this.updateSliders = this.updateSliders.bind(this);
        this.inputsView.updateSliders = this.updateSliders;

        this.initialize();
    }

    initialize() {
        this.sliderView.initialize();
        this.inputsView.initialize();
    }

    getModelData() {
        return this.model.getOptions();
    }

    updateInputs(data) {
        this.model.updateOptions(data);
        this.inputsView.update(data);
    }
    updateSliders(data) {
        this.model.updateOptions(data);
        this.sliderView.update();
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