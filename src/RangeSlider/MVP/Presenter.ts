import Model from './Model/Model';
import ViewManager from './Views/ViewManager';
import EventArgs from '../Events/EventArgs';
import IModelData from '../Data/IModelData';
import IViewData from '../Data/IViewData';

class Presenter {
  public model: Model;
  public viewManager: ViewManager;

  constructor(model: Model, viewManager: ViewManager) {
    this.model = model;
    this.viewManager = viewManager;

    this.initialize();
  }

  private initialize(): void {
    this.viewManager.onSetModelData.subscribe(this.handleSetModelData);
    this.viewManager.onSetModelData.subscribe(this.handleViewsUpdate);

    this.viewManager.onSetViewData.subscribe(this.handleSetViewData);
    this.viewManager.onSetViewData.subscribe(this.handleViewsUpdate);

    this.model.onSetViewData.subscribe(this.handleSetViewData);

    this.viewManager.onHandleMove.subscribe(this.handleSetModelData);
    this.viewManager.onHandleMove.subscribe(this.handleHandleMove);

    this.viewManager.onInputsChange.subscribe(this.handleSetModelData);
    this.viewManager.onInputsChange.subscribe(this.handleHandleMove);

    this.model.onGetViewData.subscribe(this.handleGetViewData);
    this.viewManager.onGetModelData.subscribe(this.handleGetModelData);

    this.model.initialize();
    this.viewManager.initialize();
  }

  private handleSetModelData = (args: EventArgs<IModelData>) => {
    this.model.update(args.data);
  };

  private handleSetViewData = (args: EventArgs<IViewData>) => {
    this.viewManager.update(args.data);
  };

  private handleGetModelData = (args: EventArgs<IModelData>) => {
    this.model.getData(args);
  };

  private handleGetViewData = (args: EventArgs<IViewData>) => {
    this.viewManager.getData(args);
  };

  private handleViewsUpdate = () => {
    this.viewManager.views.forEach((e) => e.update(true));
  };

  private handleHandleMove = () => {
    this.viewManager.views.forEach((e) => e.update(false));
  };
}

export default Presenter;
