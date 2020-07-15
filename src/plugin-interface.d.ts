import RangeSlider from "./RangeSlider/RangeSlider";
import IOptions from "./RangeSlider/MVP/Model/IOptions";
import IViewData from "./RangeSlider/MVP/Views/IViewData";

declare global {
    interface JQuery {
        rangeSlider: (options :IOptions, viewData: IViewData) => RangeSlider;
    }
}
