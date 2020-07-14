import { Model } from "./Model/Model";
import { Options, IOptions } from "./Model/Options";
import { View } from "./Views/View";
import { SliderView } from "./Views/SliderView";
import { InputsView } from "./Views/InputsView";
import { OptionsPanelView } from "./Views/OptionsPanelView";

import { Event } from "../Events/Event";
import { OptionsEventArgs, OptionsToUpdateEventArgs, IEventArgs } from "../Events/EventArgs";

class Presenter {
    private model: Model;
    private sliderView: View;
    private inputsView: View;
    private optionsPanelView: View;

    constructor(model: Model, sliderView: View, inputsView: View, optionsPanelView: View) {
        this.model = model;
        this.sliderView = sliderView;
        this.inputsView = inputsView;
        this.optionsPanelView = optionsPanelView;

        this.handlerGetModelData = this.handlerGetModelData.bind(this);
        this.handlerModelStateUpdate = this.handlerModelStateUpdate.bind(this);
        this.handlerHandleMove = this.handlerHandleMove.bind(this);
        this.handlerInputChange = this.handlerInputChange.bind(this);

        this.initialize();
    }

    initialize(): void {
        this.sliderView.onGetModelData.subscribe(this.handlerGetModelData);
        this.inputsView.onGetModelData.subscribe(this.handlerGetModelData);
        this.optionsPanelView.onGetModelData.subscribe(this.handlerGetModelData);

        (<OptionsPanelView>this.optionsPanelView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);
        (<SliderView>this.sliderView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);
        (<SliderView>this.sliderView).onHandleMove.subscribe(this.handlerHandleMove);
        (<InputsView>this.inputsView).onInputsChange.subscribe(this.handlerInputChange);

        this.sliderView.initialize();
        this.inputsView.initialize();
        this.optionsPanelView.initialize();
    }

    public handlerGetModelData(args: IEventArgs): void {
        this.model.getOptions(<OptionsEventArgs>args);
    }

    public handlerHandleMove(args: IEventArgs) {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.sliderView.update(false);
        this.inputsView.update(false);
    }

    public handlerInputChange(args: IEventArgs): void {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.sliderView.update(false);
    }

    public handlerModelStateUpdate(args: IEventArgs) {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.sliderView.update(true);
        this.inputsView.update(false);
        this.optionsPanelView.update(false);
    }
}

export { Presenter };