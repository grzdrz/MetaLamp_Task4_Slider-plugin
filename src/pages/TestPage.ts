import { RangeSlider } from "../RangeSlider/RangeSlider";
import { Options } from "../RangeSlider/MVP/Model/Options";

let options = {
    sliderStripLength: 500,
    sliderStripThickness: 10,
    handleWidth: 20,
    handleHeight: 20,
    minValue: -23,
    maxValue: 123,
    borderThickness: 10,
    firstValue: 0,
    lastValue: 50,
    stepSize: 0.00001,
    hasTwoSlider: true,
    isInterval: true,
    maxSegmentsCount: 5,
    scaleFontSize: 15,
    angle: 0,
};
RangeSlider.createRangeSlider(".test-page__tested-range-slider-container2", options);

import "./TestPage.scss"; 