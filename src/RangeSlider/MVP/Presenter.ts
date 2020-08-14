import Model from "./Model/Model";
import ViewManager from "./Views/ViewManager";
import EventArgs from "../Events/EventArgs";
import IModelData from "./Model/Data/IModelData";
import IViewData from "./Views/Data/IViewData";

class Presenter {
    public model: Model;
    public viewManager: ViewManager;

    constructor(model: Model, viewManager: ViewManager) {
        this.model = model;
        this.viewManager = viewManager;

        this.handlerGetModelData = this.handlerGetModelData.bind(this);
        this.handlerGetViewData = this.handlerGetViewData.bind(this);
        this.handlerHandleMove = this.handlerHandleMove.bind(this);
        this.handlerViewsUpdate = this.handlerViewsUpdate.bind(this);

        this.initialize();
    }

    private initialize(): void {
        this.viewManager.onSetModelData.subscribe(this.handlerSetModelData);
        this.viewManager.onSetModelData.subscribe(this.handlerViewsUpdate);

        this.viewManager.onSetViewData.subscribe(this.handlerSetViewData);
        this.viewManager.onSetViewData.subscribe(this.handlerViewsUpdate);

        this.model.onSetViewData.subscribe(this.handlerSetViewData);

        this.viewManager.onHandleMove.subscribe(this.handlerSetModelData);
        this.viewManager.onHandleMove.subscribe(this.handlerHandleMove);

        this.viewManager.onInputsChange.subscribe(this.handlerSetModelData);
        this.viewManager.onInputsChange.subscribe(this.handlerHandleMove);

        this.model.onGetViewData.subscribe(this.handlerGetViewData);
        this.viewManager.onGetModelData.subscribe(this.handlerGetModelData);

        this.model.initialize();
        this.viewManager.initialize();
    }

    private handlerSetModelData = (args: EventArgs<IModelData>) => {
        this.model.update(args.data);
    };

    private handlerSetViewData = (args: EventArgs<IViewData>) => {
        this.viewManager.update(args.data);
    };

    private handlerGetModelData(args: EventArgs<IModelData>): void {
        this.model.getData(args);
    }

    private handlerGetViewData(args: EventArgs<IViewData>): void {
        this.viewManager.getData(args);
    }

    private handlerViewsUpdate(): void {
        this.viewManager.views.forEach((e) => e.update(true));
    }

    private handlerHandleMove(): void {
        this.viewManager.views.forEach((e) => e.update(false));
    }
}

export default Presenter;
