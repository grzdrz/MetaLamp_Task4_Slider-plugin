import "../plugin.ts";
import $ from "jquery";
import "./TestPage.scss";

const modelData = {
    minValue: -9,
    maxValue: 9,
    values: [-3, 3],
    stepSize: 0.000001,
    hasTwoSlider: true,
    canPush: true,
};
const viewData = {
    sliderStripThickness: 10,
    handleWidth: 20,
    handleHeight: 20,
    borderThickness: 10,
    maxSegmentsCount: 6,
    scaleFontSize: 15,
    angle: 0,
    filledStrips: [true, false, true],
    isHandlesSeparated: false,
    hasScale: true,
    hasOptions: true,
};
$(".test-page__tested-range-slider-container1").rangeSlider(modelData, viewData);

const viewData2 = {
    sliderStripThickness: 10,
    handleWidth: 20,
    handleHeight: 20,
    borderThickness: 10,
    maxSegmentsCount: 6,
    scaleFontSize: 15,
    angle: 0,
    filledStrips: [true, false, true],
    isHandlesSeparated: false,
    hasScale: true,
    hasOptions: false,
};
$(".test-page__tested-range-slider-container2").rangeSlider(modelData, viewData2);
