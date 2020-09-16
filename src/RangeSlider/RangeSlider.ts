import Model from './MVP/Model/Model';
import ViewManager from './MVP/Views/ViewManager';
import Presenter from './MVP/Presenter';
import IModelData from './Data/IModelData';
import ModelData from './Data/ModelData';
import IViewData from './Data/IViewData';
import ViewData from './Data/ViewData';
import './Styles/RangeSlider.scss';

class RangeSlider {
  public static createRangeSlider(containerElement: HTMLElement, modelData: IModelData, viewData: IViewData): Presenter {
    const defaultModelData = new ModelData(modelData);
    const defaultViewData = new ViewData(viewData);
    const model = new Model(defaultModelData);
    const viewManager = new ViewManager(defaultViewData, containerElement);

    return new Presenter(model, viewManager);
  }
}

export default RangeSlider;
