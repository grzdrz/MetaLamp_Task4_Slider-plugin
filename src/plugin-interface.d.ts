import { RangeSlider } from "./RangeSlider/RangeSlider";
import { IOptions } from "./RangeSlider/MVP/Model/Options";

declare global {
    interface JQuery {
        rangeSlider: (options :IOptions) => RangeSlider;
    }
}