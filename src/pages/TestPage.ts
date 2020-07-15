import "../plugin.ts";
import $ from "jquery";

let options = {
    //sliderStripLength: 500,
    sliderStripThickness: 10,
    handleWidth: 20,
    handleHeight: 20,
    minValue: -9,
    maxValue: 9,
    borderThickness: 10,
    firstValue: 0,
    lastValue: 3,
    stepSize: 0.000001,
    hasTwoSlider: true,
    isInterval: true,
    maxSegmentsCount: 6,
    scaleFontSize: 15,
    angle: 0,
};
$(".test-page__tested-range-slider-container2").rangeSlider(options);


let options2 = {
    //sliderStripLength: 300,
    sliderStripThickness: 10,
    handleWidth: 20,
    handleHeight: 20,
    minValue: 0,
    maxValue: 10,
    borderThickness: 10,
    firstValue: 0,
    lastValue: 3,
    stepSize: 0.0000000003,
    hasTwoSlider: false,
    isInterval: true,
    maxSegmentsCount: 6,
    scaleFontSize: 15,
    angle: 90,
};
//$(".test-page__tested-range-slider-container").rangeSlider(options2);

import "./TestPage.scss"; 