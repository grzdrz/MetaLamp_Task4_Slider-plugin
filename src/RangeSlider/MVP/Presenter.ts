import Model from "./Model/Model";

import ViewManager from "./Views/ViewManager";

import EventArgs from "../Events/EventArgs";
import ModelDataEventArgs from "../Events/ModelDataEventArgs";
import ViewDataEventArgs from "../Events/ViewDataEventArgs";

class Presenter {
    private model: Model;

    private viewManager: ViewManager;

    constructor(model: Model, viewManager: ViewManager) {
        this.model = model;
        this.viewManager = viewManager;

        this.handlerGetModelData = this.handlerGetModelData.bind(this);
        this.handlerModelStateUpdate = this.handlerModelStateUpdate.bind(this);
        this.handlerHandleMove = this.handlerHandleMove.bind(this);
        this.handlerInputChange = this.handlerInputChange.bind(this);
        this.handlerViewStateUpdate = this.handlerViewStateUpdate.bind(this);

        this.handlerValuesChange = this.handlerValuesChange.bind(this);
        this.handlerGetViewData = this.handlerGetViewData.bind(this);

        this.initialize();
    }

    initialize(): void {
        this.viewManager.initialize();

        (this.viewManager.optionsPanelView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);
        (this.viewManager.sliderView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);
        (this.viewManager.sliderView).onHandleMove.subscribe(this.handlerHandleMove);
        (this.viewManager.inputsView).onInputsChange.subscribe(this.handlerInputChange);

        [this.viewManager.sliderView, this.viewManager.inputsView, this.viewManager.optionsPanelView].forEach((view) => {
            view.onGetModelData.subscribe(this.handlerGetModelData);
            view.onViewStateUpdate.subscribe(this.handlerViewStateUpdate);
            view.initialize();
        });

        this.model.onValuesChange.subscribe(this.handlerValuesChange);
        this.model.onGetViewData.subscribe(this.handlerGetViewData);
    }

    public handlerGetModelData(args: EventArgs): void {
        this.model.getOptions(<ModelDataEventArgs>args);
    }

    public handlerGetViewData(args: EventArgs): void {
        this.viewManager.getData(<ViewDataEventArgs>args);
    }

    public handlerHandleMove(args: EventArgs): void {
        this.model.updateOptions((<ModelDataEventArgs>args).data);
        this.viewManager.sliderView.update(false);
        this.viewManager.inputsView.update(false);
    }

    public handlerInputChange(args: EventArgs): void {
        this.model.updateOptions((<ModelDataEventArgs>args).data);
        this.viewManager.sliderView.update(false);
        this.viewManager.inputsView.update(true);
    }

    public handlerValuesChange(args: EventArgs): void {
        this.viewManager.viewData.update((<ViewDataEventArgs>args).data);
    }

    public handlerModelStateUpdate(args: EventArgs): void {
        this.model.updateOptions((<ModelDataEventArgs>args).data);
        this.viewManager.sliderView.update(true);
        this.viewManager.inputsView.update(true);
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
