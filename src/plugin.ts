import $ from 'jquery';
import { RangeSlider } from './RangeSlider/RangeSlider';
import { IOptions } from './RangeSlider/MVP/Model/Options';

$.fn.rangeSlider = function (this: JQuery, options: IOptions): JQuery {
    RangeSlider.createRangeSlider(this[0], options);
    return this;
};