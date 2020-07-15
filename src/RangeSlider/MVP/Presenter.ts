import Model from "./Model/Model";
import SliderView from "./Views/SliderView";
import InputsView from "./Views/InputsView";
import OptionsPanelView from "./Views/OptionsPanelView";

import OptionsEventArgs from "../Events/OptionsEventArgs";
import OptionsToUpdateEventArgs from "../Events/OptionsToUpdateEventArgs";
import EventArgs from "../Events/EventArgs";
import ViewManager from "./Views/ViewManager";
import ViewDataEventArgs from "../Events/ViewDataEventArgs";

class Presenter {
    private model: Model;

    /* private sliderView: View;

    private inputsView: View;

    private optionsPanelView: View; */
    private viewManager: ViewManager;

    constructor(model: Model, viewManager: ViewManager/* sliderView: View, inputsView: View, optionsPanelView: View */) {
        this.model = model;
        this.viewManager = viewManager;
        /* this.sliderView = sliderView;
        this.inputsView = inputsView;
        this.optionsPanelView = optionsPanelView; */

        this.handlerGetModelData = this.handlerGetModelData.bind(this);
        this.handlerModelStateUpdate = this.handlerModelStateUpdate.bind(this);
        this.handlerHandleMove = this.handlerHandleMove.bind(this);
        this.handlerInputChange = this.handlerInputChange.bind(this);
        this.handlerViewStateUpdate = this.handlerViewStateUpdate.bind(this);

        this.initialize();
    }

    initialize(): void {
        this.viewManager.initialize();
        /* this.sliderView.onGetModelData.subscribe(this.handlerGetModelData);
        this.inputsView.onGetModelData.subscribe(this.handlerGetModelData);
        this.optionsPanelView.onGetModelData.subscribe(this.handlerGetModelData); */

        (this.viewManager.optionsPanelView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);
        (this.viewManager.sliderView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);
        (this.viewManager.sliderView).onHandleMove.subscribe(this.handlerHandleMove);
        (this.viewManager.inputsView).onInputsChange.subscribe(this.handlerInputChange);

        /* this.sliderView.initialize();
        this.inputsView.initialize();
        this.optionsPanelView.initialize(); */
        [this.viewManager.sliderView, this.viewManager.inputsView, this.viewManager.optionsPanelView].forEach((view) => {
            view.onGetModelData.subscribe(this.handlerGetModelData);
            view.onViewStateUpdate.subscribe(this.handlerViewStateUpdate);
            view.initialize();
        });
    }

    public handlerGetModelData(args: EventArgs): void {
        this.model.getOptions(<OptionsEventArgs>args);
    }

    public handlerHandleMove(args: EventArgs): void {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.viewManager.sliderView.update(false);
        this.viewManager.inputsView.update(false);
    }

    public handlerInputChange(args: EventArgs): void {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.viewManager.sliderView.update(false);
    }

    public handlerModelStateUpdate(args: EventArgs): void {
        this.model.updateOptions((<OptionsToUpdateEventArgs>args).options);
        this.viewManager.sliderView.update(true);
        this.viewManager.inputsView.update(false);
        this.viewManager.optionsPanelView.update(false);
    }

    public handlerViewStateUpdate(args: EventArgs): void {
        this.viewManager.viewData.update((<ViewDataEventArgs>args).data);
        this.viewManager.sliderView.update(true);
        this.viewManager.inputsView.update(false);
        this.viewManager.optionsPanelView.update(false);
    }
}

export default Presenter;
