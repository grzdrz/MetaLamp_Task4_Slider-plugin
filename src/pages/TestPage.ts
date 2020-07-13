import { RangeSlider } from "../RangeSlider/RangeSlider";
import { Options } from "../RangeSlider/MVP/Model/Options";

let options = {
    sliderStripLength: 1000,
    sliderStripThickness: 10,
    handleWidth: 20,
    handleHeight: 20,
    minValue: -9,
    maxValue: 9,
    borderThickness: 10,
    firstValue: 0,
    lastValue: 3,
    stepSize: 3,
    hasTwoSlider: true,
    isInterval: true,
    maxSegmentsCount: 5,
    scaleFontSize: 15,
    angle: 0,
};
RangeSlider.createRangeSlider(".test-page__tested-range-slider-container2", options);

import "./TestPage.scss"; 