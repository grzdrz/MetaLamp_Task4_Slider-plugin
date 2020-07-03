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

        this.updateModelData = this.updateModelData.bind(this);

        this.updateInputs = this.updateInputs.bind(this);
        this.sliderView.updateInputs = this.updateInputs;
        this.sliderView.updateModelData = this.updateModelData;

        this.updateSliders = this.updateSliders.bind(this);
        this.inputsView.updateSliders = this.updateSliders;

        this.onScaleSegmentClick = this.onScaleSegmentClick.bind(this);
        this.scaleView.onScaleSegmentClick = this.onScaleSegmentClick;

        this.onStepSizeChange = this.onStepSizeChange.bind(this);
        this.optionsPanelView.onStepSizeChange = this.onStepSizeChange;

        this.onOrientationChange = this.onOrientationChange.bind(this);
        this.optionsPanelView.onOrientationChange = this.onOrientationChange;

        this.onMaxValueChange = this.onMaxValueChange.bind(this);
        this.optionsPanelView.onMaxValueChange = this.onMaxValueChange;
        this.onMinValueChange = this.onMinValueChange.bind(this);
        this.optionsPanelView.onMinValueChange = this.onMinValueChange;

        this.onHandlesCountChange = this.onHandlesCountChange.bind(this);
        this.optionsPanelView.onHandlesCountChange = this.onHandlesCountChange;

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

    updateModelData(data) {
        this.model.updateOptions(data);
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
        this.sliderView.update(true);
        this.scaleView.update(true);
        this.inputsView.update(true);
        /* this.sliderView.update(); */
    }
    onOrientationChange() {
        let orientation = this.model.getOption("orientation");
        if (orientation === "horizontal") {
            this.model.updateOptions({ orientation: "vertical" });
        }
        else {
            this.model.updateOptions({ orientation: "horizontal" });
        }

        this.sliderView.update(true);
        this.scaleView.update(true);
        this.optionsPanelView.update();
    }
    onMaxValueChange(data) {
        this.model.updateOptions(data);
        this.sliderView.update(true);
        this.scaleView.update(true);
        this.inputsView.update(true);
    }
    onMinValueChange(data) {
        this.model.updateOptions(data);
        this.sliderView.update(true);
        this.scaleView.update(true);
        this.inputsView.update(true);
    }
    onHandlesCountChange(data) {
        this.model.updateOptions(data);
        this.sliderView.update(true);
        this.scaleView.update(true);
        this.inputsView.update(true);
    }
}