//import { app } from "../app.js";
/* import { rangeSliderScript } from "../components/RangeSlider/RangeSlider.js";
rangeSliderScript(); */

import { createRangeSlider } from "../components/RangeSlider/RangeSlider.js";

let options2 = {
    sliderStripLength: 650,
    sliderStripThickness: 5,
    handleWidth: 10,
    handleHeight: 10,
    title: "some range slider",
    maxValue: 100,
    minValue: 0,
    borderThickness: 10,
    firstValue: 0,
    lastValue: 50,
    valueType: "₽",
    stepSize: 10,
    orientation: "vertical",// vertical | horizontal
    hasTwoSlider: true,
    isInterval: true,
    maxSegmentsCount: 10,
    scaleFontSize: 40,
};
createRangeSlider(".test-page__tested-range-slider-container2", options2);


let options1 = {
    sliderStripLength: 650,
    sliderStripThickness: 10,
    handleWidth: 10,
    handleHeight: 10,
    title: "some range slider",
    maxValue: 200,
    minValue: 0,
    borderThickness: 10,
    firstValue: 0,
    lastValue: 50,
    valueType: "₽",
    stepSize: 10,
    orientation: "vertical",// vertical | horizontal
    hasTwoSlider: true,
    isInterval: true,
    maxSegmentsCount: 10,
    scaleFontSize: 20,
};
createRangeSlider(".test-page__tested-range-slider-container", options1);

let options3 = {
    sliderStripLength: 650,
    sliderStripThickness: 10,
    handleWidth: 40,
    handleHeight: 40,
    title: "some range slider",
    maxValue: 200,
    minValue: 0,
    borderThickness: 10,
    firstValue: 0,
    //lastValue: 50,
    valueType: "₽",
    stepSize: 10,
    orientation: "vertical",// vertical | horizontal
    hasTwoSlider: false,
    isInterval: true,
    maxSegmentsCount: 10,
    scaleFontSize: 10,
};
createRangeSlider(".test-page__tested-range-slider-container3", options3);

let options4 = {
    sliderStripLength: 850,
    sliderStripThickness: 10,
    handleWidth: 10,
    handleHeight: 10,
    title: "some range slider",
    maxValue: 200,
    minValue: 0,
    borderThickness: 10,
    firstValue: 0,
    //lastValue: 50,
    valueType: "₽",
    stepSize: 10,
    orientation: "horizontal",// vertical | horizontal
    hasTwoSlider: false,
    isInterval: true,
    maxSegmentsCount: 10,
    scaleFontSize: 20,
};
createRangeSlider(".test-page__tested-range-slider-container4", options4);

import "./TestPage.scss"; 