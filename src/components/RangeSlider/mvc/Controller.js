export class Controller {
    constructor(model, sliderView, inputsView, scaleView, optionsPanelView) {
        this.model = model;
        this.sliderView = sliderView;
        this.inputsView = inputsView;
        this.scaleView = scaleView;
        this.optionsPanelView = optionsPanelView;

        this.getModelData = this.getModelData.bind(this);
        this.sliderView.getModelData = this.getModelData;
        this.inputsView.getModelData = this.getModelData;
        this.scaleView.getModelData = this.getModelData;
        this.optionsPanelView.getModelData = this.getModelData;

        this.updateInputs = this.updateInputs.bind(this);
        this.sliderView.updateInputs = this.updateInputs;

        this.updateSliders = this.updateSliders.bind(this);
        this.inputsView.updateSliders = this.updateSliders;

        this.onScaleSegmentClick = this.onScaleSegmentClick.bind(this);
        this.scaleView.onScaleSegmentClick = this.onScaleSegmentClick;

        this.onStepSizeChange = this.onStepSizeChange.bind(this);
        this.optionsPanelView.onStepSizeChange = this.onStepSizeChange;

        this.initialize();
    }

    initialize() {
        this.sliderView.initialize();
        this.inputsView.initialize();
        this.scaleView.initialize();
        this.optionsPanelView.initialize();
    }

    getModelData(optionName) {
        if (optionName !== undefined)
            return this.model.getOption(optionName);
        else
            return this.model.getOptions();
    }

    updateInputs(data) {
        this.model.updateOptions(data);
        this.inputsView.update();
    }
    updateSliders(data) {
        this.model.updateOptions(data);
        this.sliderView.update();
    }
    onScaleSegmentClick(data) {
        this.model.updateOptions(data);
        this.sliderView.update();
        this.inputsView.update();
    }

    onStepSizeChange(data) {
        this.model.updateOptions(data);
        this.sliderView.update();
        this.inputsView.update();
        this.scaleView.update();
    }
}