import IModelData from './Data/IModelData';
import IViewData from './Data/IViewData';
import ModelData from './Data/ModelData';
import ViewData from './Data/ViewData';
import Model from './Model/Model';
import ViewManager from './Views/ViewManager';
import Presenter from './Presenter';

const createRangeSlider = (containerElement: HTMLElement, modelData: IModelData = {}, viewData: IViewData = {}): Presenter => {
  const defaultModelData = new ModelData(modelData);
  const defaultViewData = new ViewData(viewData);
  const model = new Model(defaultModelData);
  const viewManager = new ViewManager(defaultViewData, containerElement);

  return new Presenter(model, viewManager);
};

export default createRangeSlider;
