import $ from "jquery";
import RangeSlider from "./RangeSlider/RangeSlider";
import IOptions from "./RangeSlider/MVP/Model/IOptions";
import IViewData from "./RangeSlider/MVP/Views/IViewData";

$.fn.rangeSlider = function createRangeSlider(this: JQuery, options: IOptions, viewData: IViewData): JQuery {
    RangeSlider.createRangeSlider(this[0], options, viewData);
    return this;
};
