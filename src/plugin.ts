import $ from "jquery";
import RangeSlider from "./RangeSlider/RangeSlider";
import IOptions from "./RangeSlider/MVP/Model/IOptions";

$.fn.rangeSlider = function createRangeSlider(this: JQuery, options: IOptions): JQuery {
    RangeSlider.createRangeSlider(this[0], options);
    return this;
};
