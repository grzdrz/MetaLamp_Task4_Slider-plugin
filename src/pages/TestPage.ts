import "../plugin.ts";
import $ from "jquery";
import "./TestPage.scss";

const modelData = {
    minValue: -9,
    maxValue: 9,
    /* firstValue: 0,
    lastValue: 3, */
    values: [-3, 3],
    stepSize: 0.000001,
    hasTwoSlider: true,
};
const viewData = {
    sliderStripThickness: 10,
    handleWidth: 20,
    handleHeight: 20,
    borderThickness: 10,
    maxSegmentsCount: 6,
    scaleFontSize: 15,
    angle: 0,
};
$(".test-page__tested-range-slider-container1").rangeSlider(modelData, viewData);
