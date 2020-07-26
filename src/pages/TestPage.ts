/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../plugin.ts";
import $ from "jquery";
import "./TestPage.scss";
import IModelData from "../RangeSlider/MVP/Model/Data/IModelData";
import IViewData from "../RangeSlider/MVP/Views/Data/IViewData";
import ModelData from "../RangeSlider/MVP/Model/Data/ModelData";
import ViewData from "../RangeSlider/MVP/Views/Data/ViewData";

const modelData = {
    minValue: 19,
    maxValue: 29,
    values: [-3, 3, -7, -11, 11],
    stepSize: 100,
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
const sliderElement1 = $(".js-test-page__tested-range-slider-container_1").rangeSlider(modelData, viewData);

const setData = <(modelData: IModelData, viewData: IViewData) => void>sliderElement1.data("setData");
setData({
    values: [-3, 3],
}, {});

const getModelData = <() => ModelData>sliderElement1.data("getModelData");
const mData = getModelData();
for (const porperty of Object.entries(mData)) {
    console.log(`${porperty[0]}: ${porperty[1]}`);
}

console.log("\n");

const getViewData = <() => ViewData>sliderElement1.data("getViewData");
const vData = getViewData();
for (const porperty of Object.entries(vData)) {
    console.log(`${porperty[0]}: ${porperty[1]}`);
}

$(".js-test-page__tested-range-slider-container_2").rangeSlider({}, {});
