import { Model } from "./Model/Model";
import { Options, IOptions } from "./Model/Options";
import { View } from "./Views/View";
import { SliderView } from "./Views/SliderView";
import { InputsView } from "./Views/InputsView";
import { ScaleView } from "./Views/ScaleView";
import { OptionsPanelView } from "./Views/OptionsPanelView";

import { Event } from "../Events/Event";
import { OptionsEventArgs, OptionsToUpdateEventArgs, EventArgs } from "../Events/EventArgs";

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

        this.handlerGetModelData = this.handlerGetModelData.bind(this);
        (<SliderView>this.sliderView).onGetModelData.subscribe(this.handlerGetModelData);
        (<InputsView>this.inputsView).onGetModelData.subscribe(this.handlerGetModelData);
        (<ScaleView>this.scaleView).onGetModelData.subscribe(this.handlerGetModelData);
        (<OptionsPanelView>this.optionsPanelView).onGetModelData.subscribe(this.handlerGetModelData);

        this.handlerHandleMove = this.handlerHandleMove.bind(this);
        (<SliderView>this.sliderView).onHandleMove.subscribe(this.handlerHandleMove);
        //this.onModelOptionUpdate = this.onModelOptionUpdate.bind(this);
        //(<SliderView>this.sliderView).onModelOptionUpdate = this.onModelOptionUpdate;

        this.handlerInputChange = this.handlerInputChange.bind(this);
        (<InputsView>this.inputsView).onInputsChange.subscribe(this.handlerInputChange);

        this.handlerScaleSegmentClick = this.handlerScaleSegmentClick.bind(this);
        (<ScaleView>this.scaleView).onScaleSegmentClick.subscribe(this.handlerScaleSegmentClick);

        this.handlerModelStateUpdate = this.handlerModelStateUpdate.bind(this);
        (<OptionsPanelView>this.optionsPanelView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);

        this.initialize();
    }

    initialize(): void {
        this.sliderView.initialize();
        this.inputsView.initialize();
        this.scaleView.initialize();
        this.optionsPanelView.initialize();
    }

    public handlerGetModelData(args: EventArgs): void {
        this.model.getOptions(<OptionsEventArgs>args);
    }

    /* public onModelOptionUpdate(data: IOptions) {
        this.model.updateOptions(data);
    } */
    public handlerHandleMove(args: EventArgs) {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        (<InputsView>this.inputsView).update();
    }

    public handlerInputChange(args: EventArgs): void {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        (<SliderView>this.sliderView).update(false);
    }

    public handlerScaleSegmentClick(args: EventArgs): void {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        (<SliderView>this.sliderView).update(false);
        (<InputsView>this.inputsView).update();
    }

    public handlerModelStateUpdate(args: EventArgs) {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        (<SliderView>this.sliderView).update(true);
        (<ScaleView>this.scaleView).update(true);
        (<InputsView>this.inputsView).update();
        (<OptionsPanelView>this.optionsPanelView).update();
    }
}

export { Presenter };