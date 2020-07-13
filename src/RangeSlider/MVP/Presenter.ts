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
        this.sliderView.onGetModelData.subscribe(this.handlerGetModelData);
        this.inputsView.onGetModelData.subscribe(this.handlerGetModelData);
        this.scaleView.onGetModelData.subscribe(this.handlerGetModelData);
        this.optionsPanelView.onGetModelData.subscribe(this.handlerGetModelData);

        this.handlerModelStateUpdate = this.handlerModelStateUpdate.bind(this);
        (<OptionsPanelView>this.optionsPanelView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);

        this.handlerHandleMove = this.handlerHandleMove.bind(this);
        (<SliderView>this.sliderView).onHandleMove.subscribe(this.handlerHandleMove);
        (<SliderView>this.sliderView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);

        this.handlerInputChange = this.handlerInputChange.bind(this);
        (<InputsView>this.inputsView).onInputsChange.subscribe(this.handlerInputChange);

        this.handlerScaleSegmentClick = this.handlerScaleSegmentClick.bind(this);
        (<ScaleView>this.scaleView).onScaleSegmentClick.subscribe(this.handlerScaleSegmentClick);

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

    public handlerHandleMove(args: EventArgs) {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.sliderView.update(false);
        this.inputsView.update(false);
    }

    public handlerInputChange(args: EventArgs): void {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.sliderView.update(false);
    }

    public handlerScaleSegmentClick(args: EventArgs): void {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.sliderView.update(false);
        this.inputsView.update(false);
    }

    public handlerModelStateUpdate(args: EventArgs) {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.sliderView.update(true);
        this.scaleView.update(true);
        this.inputsView.update(false);
        this.optionsPanelView.update(false);
    }
}

export { Presenter };