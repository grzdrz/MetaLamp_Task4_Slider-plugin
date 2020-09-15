import IModelData from './RangeSlider/Data/IModelData';
import IViewData from './RangeSlider/Data/IViewData';

declare global {
  interface JQuery {
    rangeSlider: (options: IModelData, viewData: IViewData) => JQuery;
  }
}
