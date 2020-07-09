export class Presenter {
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

        this.onModelOptionUpdate = this.onModelOptionUpdate.bind(this);
        this.onHandleMove = this.onHandleMove.bind(this);
        this.sliderView.onHandleMove = this.onHandleMove;
        this.sliderView.onModelOptionUpdate = this.onModelOptionUpdate;

        this.onInputChange = this.onInputChange.bind(this);
        this.inputsView.onInputChange = this.onInputChange;

        this.onScaleSegmentClick = this.onScaleSegmentClick.bind(this);
        this.scaleView.onScaleSegmentClick = this.onScaleSegmentClick;


        this.onModelStateUpdate = this.onModelStateUpdate.bind(this);
        this.optionsPanelView.onModelStateUpdate = this.onModelStateUpdate;

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

    onModelOptionUpdate(data) {
        this.model.updateOptions(data);
    }

    onHandleMove(data) {
        this.model.updateOptions(data);
        this.inputsView.update();
    }

    onInputChange(data) {
        this.model.updateOptions(data);
        this.sliderView.update();
    }

    onScaleSegmentClick(data) {
        this.model.updateOptions(data);
        this.sliderView.update();
        this.inputsView.update();
    }

    onModelStateUpdate(data) {
        this.model.updateOptions(data);
        this.sliderView.update(true);
        this.scaleView.update(true);
        this.inputsView.update(true);
        this.optionsPanelView.update();
    }
}