import EventArgs from './Events/EventArgs';
import IModelData from './Data/IModelData';
import IViewData from './Data/IViewData';
import Model from './Model/Model';
import ViewManager from './Views/ViewManager';
import './Styles/RangeSlider.scss';

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

    this.model.onExtractViewData.subscribe(this.handleExtractViewData);
    this.viewManager.onExtractModelData.subscribe(this.handleExtractModelData);

    this.model.initialize();
    this.viewManager.initialize();
  }

  private handleSetModelData = (args?: EventArgs<IModelData>) => {
    if (args) this.model.update(args.data);
  };

  private handleSetViewData = (args?: EventArgs<IViewData>) => {
    if (args) this.viewManager.update(args.data);
  };

  private handleViewsUpdate = () => {
    this.viewManager.views.forEach((view) => view.update(true));
  };

  private handleHandleMove = () => {
    this.viewManager.views.forEach((view) => view.update(false));
  };

  private handleExtractModelData = () => {
    this.viewManager.modelData = this.model.getData();
  };

  private handleExtractViewData = () => {
    this.model.viewData = this.viewManager.getData();
  };
}

export default Presenter;
