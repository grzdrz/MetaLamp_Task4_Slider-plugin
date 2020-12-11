import EventArgs from './Events/EventArgs';
import IModelData from './Data/IModelData';
import Model from './Model/Model';
import ViewManager from './Views/ViewManager';
import './Styles/RangeSlider.scss';
import ModelData from './Data/ModelData';

class Presenter {
  public model: Model;
  public viewManager: ViewManager;

  constructor(model: Model, viewManager: ViewManager) {
    this.model = model;
    this.viewManager = viewManager;

    this.initialize();
  }

  private initialize(): void {
    this.setEventHandlers();
    this.model.initialize();
    this.viewManager.initialize();
  }

  private setEventHandlers() {
    this.viewManager.onHandleMove.subscribe(this.setModelData);
    this.viewManager.onInputsChange.subscribe(this.setModelData);
    this.model.onUpdated.subscribe(this.updateViewState);
  }

  private setModelData = (args?: EventArgs<IModelData>) => {
    if (args) this.model.update(args.data);
  };

  private updateViewState = (args?: EventArgs<IModelData>) => {
    if (args) this.viewManager.modelData = <ModelData>args.data;
  };
}

export default Presenter;
