import RangeSlider from "./RangeSlider/RangeSlider";
import IOptions from "./RangeSlider/MVP/Model/IOptions";

declare global {
    interface JQuery {
        rangeSlider: (options :IOptions) => RangeSlider;
    }
}
