import { Model } from "./Model/Model";
import { Options, IOptions } from "./Model/Options";
import { View } from "./Views/View";
import { SliderView } from "./Views/SliderView";
import { InputsView } from "./Views/InputsView";
import { ScaleView } from "./Views/ScaleView";
import { OptionsPanelView } from "./Views/OptionsPanelView";

class Presenter {
    private model: Model;
    private sliderView: View;
    private inputsView: View;
    private scaleView: View;
    private optionsPanelView: View;

    constructor(model: Model, sliderView: View, inputsView: View, scaleView: View, optionsPanelView: View) {
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
        (<SliderView>this.sliderView).onHandleMove = this.onHandleMove;
        (<SliderView>this.sliderView).onModelOptionUpdate = this.onModelOptionUpdate;

        this.onInputChange = this.onInputChange.bind(this);
        (<InputsView>this.inputsView).onInputChange = this.onInputChange;

        this.onScaleSegmentClick = this.onScaleSegmentClick.bind(this);
        (<ScaleView>this.scaleView).onScaleSegmentClick = this.onScaleSegmentClick;


        this.onModelStateUpdate = this.onModelStateUpdate.bind(this);
        (<OptionsPanelView>this.optionsPanelView).onModelStateUpdate = this.onModelStateUpdate;

        this.initialize();
    }

    initialize(): void {
        this.sliderView.initialize();
        this.inputsView.initialize();
        this.scaleView.initialize();
        this.optionsPanelView.initialize();
    }

    public getModelData(): Options {
        return this.model.getOptions();
    }

    public onModelOptionUpdate(data: IOptions) {
        this.model.updateOptions(data);
    }

    public onHandleMove(data: IOptions) {
        this.model.updateOptions(data);
        this.inputsView.update();
    }

    public onInputChange(data: IOptions) {
        this.model.updateOptions(data);
        this.sliderView.update();
    }

    public onScaleSegmentClick(data: IOptions) {
        this.model.updateOptions(data);
        this.sliderView.update();
        this.inputsView.update();
    }

    public onModelStateUpdate(data: IOptions) {
        this.model.updateOptions(data);
        this.sliderView.update(true);
        this.scaleView.update(true);
        this.inputsView.update(true);
        this.optionsPanelView.update();
    }
}

export { Presenter };