import EventArgs from './Events/EventArgs';
import IModelData from './Data/IModelData';
import Model from './Model/Model';
import ViewManager from './Views/ViewManager';
import './Styles/RangeSlider.scss';
import ModelData from './Data/ModelData';
import IHandleData from './Data/IHandleData';

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
    this.model.onValuesUpdated.subscribe(this.updateView);
    this.model.onValuesUpdated.subscribe(this.viewManager.updateViewsWithoutRender);

    this.model.onUpdated.subscribe(this.updateView);
    this.model.onUpdated.subscribe(this.viewManager.updateViewsWithRender);

    this.viewManager.onHandleMove.subscribe(this.handlesMoved);

    this.viewManager.onScaleClick.subscribe(this.valueChanged);

    this.viewManager.onInputsChange.subscribe(this.modelChanged);
  }

  private handlesMoved = (args?: EventArgs<IHandleData>) => {
    if (args) this.model.handlesMoved(args?.data);
  };

  private valueChanged = (args?: EventArgs<number>) => {
    if (args) this.model.valueChanged(args?.data);
  };

  private modelChanged = (args?: EventArgs<IModelData>) => {
    if (args) this.model.updateData(args?.data);
  };

  private updateView = (args?: EventArgs<IModelData>) => {
    if (args) this.viewManager.modelData = <ModelData>args.data;
  };
}

export default Presenter;
