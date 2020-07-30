/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../plugin.ts";
import $ from "jquery";
import "./TestPage.scss";
import OptionsPanelView from "./OptionsPanel/OptionsPanelView";
import IModelData from "../RangeSlider/MVP/Model/Data/IModelData";
import IViewData from "../RangeSlider/MVP/Views/Data/IViewData";
import ModelData from "../RangeSlider/MVP/Model/Data/ModelData";
import ViewData from "../RangeSlider/MVP/Views/Data/ViewData";

const modelData = {
    minValue: -100,
    maxValue: 100,
    values: [-99, -7, -3, 3, 99],
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
const jqSlider1 = $(".js-test-page__tested-range-slider-container_1").rangeSlider(modelData, viewData);
const optionsPanel1 = new OptionsPanelView(jqSlider1, jqSlider1[0]);

/* const sliderElement2 = $(".js-test-page__tested-range-slider-container_2").rangeSlider({}, {}); */

/* const setData = <(modelData: IModelData, viewData: IViewData) => void>sliderElement1.data("setData");
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
console.log("\n");

const sliderElement2 = $(".js-test-page__tested-range-slider-container_2").rangeSlider({}, {});

const setData2 = <(modelData: IModelData, viewData: IViewData) => void>sliderElement2.data("setData");
setData2({
    values: [-9, 0, 9],
}, {});

const getModelData2 = <() => ModelData>sliderElement2.data("getModelData");
const mData2 = getModelData2();
for (const porperty of Object.entries(mData2)) {
    console.log(`${porperty[0]}: ${porperty[1]}`);
}
console.log("\n");

const getViewData2 = <() => ViewData>sliderElement2.data("getViewData");
const vData2 = getViewData2();
for (const porperty of Object.entries(vData2)) {
    console.log(`${porperty[0]}: ${porperty[1]}`);
}
console.log("\n"); */
