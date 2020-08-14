import IModelData from "./RangeSlider/MVP/Model/Data/IModelData";
import IViewData from "./RangeSlider/MVP/Views/Data/IViewData";

declare global {
    interface JQuery {
        rangeSlider: (options: IModelData, viewData: IViewData) => JQuery;
    }
}
