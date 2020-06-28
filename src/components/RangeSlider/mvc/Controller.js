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