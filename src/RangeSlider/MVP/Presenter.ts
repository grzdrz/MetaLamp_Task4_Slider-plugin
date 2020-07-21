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

        this.handlerStatesUpdate = this.handlerStatesUpdate.bind(this);

        this.initialize();
    }

    private initialize(): void {
        this.viewManager.initialize();

        (this.viewManager.optionsPanelView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);
        (this.viewManager.sliderView).onModelStateUpdate.subscribe(this.handlerModelStateUpdate);
        (this.viewManager.sliderView).onHandleMove.subscribe(this.handlerHandleMove);
        (this.viewManager.inputsView).onInputsChange.subscribe(this.handlerInputChange);

        this.model.onValuesChange.subscribe(this.handlerValuesChange);
        this.model.onGetViewData.subscribe(this.handlerGetViewData);

        this.viewManager.onStatesUpdate.subscribe(this.handlerStatesUpdate);
        this.model.onStatesUpdate.subscribe(this.handlerStatesUpdate);

        [this.viewManager.sliderView, this.viewManager.inputsView, this.viewManager.optionsPanelView].forEach((view) => {
            view.onGetModelData.subscribe(this.handlerGetModelData);
            view.onViewStateUpdate.subscribe(this.handlerViewStateUpdate);
            view.initialize();
        });
    }

    private handlerGetModelData(args: EventArgs): void {
        this.model.getOptions(<ModelDataEventArgs>args);
    }

    private handlerGetViewData(args: EventArgs): void {
        this.viewManager.getData(<ViewDataEventArgs>args);
    }

    private handlerHandleMove(args: EventArgs): void {
        this.model.update((<ModelDataEventArgs>args).data);
        this.viewManager.sliderView.update(false);
        this.viewManager.inputsView.update(false);
    }

    private handlerInputChange(args: EventArgs): void {
        this.model.update((<ModelDataEventArgs>args).data);
        this.viewManager.sliderView.update(false);
        this.viewManager.inputsView.update(true);
    }

    private handlerValuesChange(args: EventArgs): void {
        this.viewManager./* viewData.update */updateData((<ViewDataEventArgs>args).data);
    }

    private handlerModelStateUpdate(args: EventArgs): void {
        this.model.update((<ModelDataEventArgs>args).data);
        this.viewManager.sliderView.update(true);
        this.viewManager.inputsView.update(true);
        this.viewManager.optionsPanelView.update(false);
    }

    private handlerViewStateUpdate(args: EventArgs): void {
        this.viewManager.updateData((<ViewDataEventArgs>args).data);
        this.viewManager.sliderView.update(true);
        this.viewManager.inputsView.update(false);
        this.viewManager.optionsPanelView.update(false);
    }

    private handlerStatesUpdate(args: EventArgs): void {
        this.model.update((<ModelDataEventArgs>args).data);
        this.viewManager.updateData((<ViewDataEventArgs>args).data);
        this.viewManager.sliderView.update(false);
        this.viewManager.inputsView.update(false);
        this.viewManager.optionsPanelView.update(false);
    }
}

export default Presenter;
