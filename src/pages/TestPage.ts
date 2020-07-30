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

import ColorSliders from "../color-sliders/color-sliders";

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

const colorSlidersContainer = <HTMLElement>(document.querySelector(".test-page__color-sliders"));
const colorSliders = new ColorSliders(colorSlidersContainer);
