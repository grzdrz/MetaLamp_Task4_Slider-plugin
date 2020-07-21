import RangeSlider from "./RangeSlider/RangeSlider";
import IModelData from "./RangeSlider/MVP/Model/Data/IModelData";
import IViewData from "./RangeSlider/MVP/Views/IViewData";

declare global {
    interface JQuery {
        rangeSlider: (options: IModelData, viewData: IViewData) => RangeSlider;
    }
}
