import "../plugin.ts";
import $ from "jquery";
import "./TestPage.scss";

const modelData = {
    minValue: -19,
    maxValue: -9,
    values: [-7, -3, 3],
    stepSize: 1,
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
    filledStrips: [true, false],
    isHandlesSeparated: false,
    hasScale: true,
    scaleMargin: 30,
    hasOptions: true,
};
$(".js-test-page__tested-range-slider-container_1").rangeSlider(modelData, viewData);

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
    scaleMargin: 30,
    hasOptions: false,
};
$(".js-test-page__tested-range-slider-container_2").rangeSlider(modelData, viewData2);
