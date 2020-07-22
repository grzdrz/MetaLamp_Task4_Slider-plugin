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
        this.handlerGetViewData = this.handlerGetViewData.bind(this);
        this.handlerHandleMove = this.handlerHandleMove.bind(this);
        this.handlerViewsUpdate = this.handlerViewsUpdate.bind(this);
        this.handlerStatesUpdate = this.handlerStatesUpdate.bind(this);

        this.initialize();
    }

    private initialize(): void {
        this.viewManager.initialize();

        this.viewManager.onStatesUpdate.subscribe(this.handlerStatesUpdate);
        this.viewManager.onStatesUpdate.subscribe(this.handlerViewsUpdate);

        this.viewManager.sliderView.onModelStateUpdate.subscribe(this.handlerStatesUpdate);
        this.viewManager.sliderView.onModelStateUpdate.subscribe(this.handlerViewsUpdate);

        this.viewManager.sliderView.onHandleMove.subscribe(this.handlerStatesUpdate);
        this.viewManager.sliderView.onHandleMove.subscribe(this.handlerHandleMove);

        this.viewManager.inputsView.onInputsChange.subscribe(this.handlerStatesUpdate);
        this.viewManager.inputsView.onInputsChange.subscribe(this.handlerHandleMove);

        this.model.onValuesChange.subscribe(this.handlerStatesUpdate);

        this.viewManager.onStatesUpdate.subscribe(this.handlerStatesUpdate);
        this.model.onStatesUpdate.subscribe(this.handlerStatesUpdate);

        this.model.onGetViewData.subscribe(this.handlerGetViewData);

        [this.viewManager.sliderView, this.viewManager.inputsView, this.viewManager.optionsPanelView].forEach((view) => {
            view.onGetModelData.subscribe(this.handlerGetModelData);
            view.initialize();
        });
    }

    private handlerStatesUpdate(args: EventArgs): void {
        this.model.update((<ModelDataEventArgs>args).data);
        this.viewManager.update((<ViewDataEventArgs>args).data);
    }

    private handlerGetModelData(args: EventArgs): void {
        this.model.getOptions(<ModelDataEventArgs>args);
    }

    private handlerGetViewData(args: EventArgs): void {
        this.viewManager.getData(<ViewDataEventArgs>args);
    }

    private handlerHandleMove(): void {
        this.viewManager.sliderView.update(false);
        this.viewManager.inputsView.update(false);
    }

    private handlerViewsUpdate(): void {
        this.viewManager.sliderView.update(true);
        this.viewManager.inputsView.update(true);
        this.viewManager.optionsPanelView.update(false);
    }
}

export default Presenter;
