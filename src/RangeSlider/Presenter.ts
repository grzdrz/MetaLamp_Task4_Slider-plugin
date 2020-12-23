import EventArgs from './Events/EventArgs';
import IModelData from './Data/IModelData';
import Model from './Model/Model';
import SliderView from './Views/SliderView/SliderView';
import ViewManager from './Views/ViewManager';
import ModelData from './Data/ModelData';
import IHandleData from './Data/IHandleData';
import IInputData from './Data/IInputData';
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
    this.setEventHandlers();
    this.model.initialize();
    this.viewManager.initialize(this.model.data);
  }

  private setEventHandlers() {
    this.model.onValuesUpdated.subscribe(this.updateViewsWithoutRender);
    this.model.onUpdated.subscribe(this.updateViewsWithRender);

    this.viewManager.onHandleMove.subscribe(this.handlesMoved);
    this.viewManager.onScaleClick.subscribe(this.valueChanged);
    this.viewManager.onInputsChange.subscribe(this.inputChanged);

    const resizeObserver = new ResizeObserver(this.handleViewportSizeChange);
    const htmlElement = this.viewManager.containerElement;
    resizeObserver.observe(htmlElement);
  }

  private handlesMoved = (args?: EventArgs<IHandleData>) => {
    if (args) this.model.handlesMoved(args?.data);
  };

  private valueChanged = (args?: EventArgs<number>) => {
    if (args) this.model.valueChanged(args?.data);
  };

  private inputChanged = (args?: EventArgs<IInputData>) => {
    if (args) this.model.valueChanged(args?.data.value, args?.data.id);
  };

  private updateViewsWithRender = (args?: EventArgs<IModelData>) => {
    if (args) this.viewManager.updateViewsWithRender(args.data as ModelData);
  };

  private updateViewsWithoutRender = (args?: EventArgs<IModelData>) => {
    if (args) this.viewManager.updateViewsWithoutRender(args.data as ModelData);
  };

  private handleViewportSizeChange = () => {
    (<SliderView>(this.viewManager.views[0])).renderContainer();
    this.viewManager.updateViewsWithoutRender(this.model.data);
  };
}

export default Presenter;
