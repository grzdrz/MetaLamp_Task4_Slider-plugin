/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../plugin.ts";
import OptionsPanel from "../components/options-panel/OptionsPanel";
import ColorCustomizer from "../components/color-customizer/color-customizer";
import SliderWithPhysic from "../components/slider-with-physic/slider-with-physic";
import "./index.scss";

const modelData1 = {
    minValue: -100,
    maxValue: 100,
    values: [-99, -7, -3, 3, 99],
    stepSize: 1,
    canPush: true,
};
const viewData1 = {
    sliderStripThickness: 10,
    handleWidth: 20,
    handleHeight: 20,
    borderThickness: 10,
    maxSegmentsCount: 6,
    scaleFontSize: 15,
    angle: 45,
    filledStrips: [true, false],
    isHandlesSeparated: false,
    hasScale: true,
    scaleMargin: 30,
    hasOptions: true,
};
const optionsPanelContainer1 = <HTMLElement>(document.querySelector(".js-test-page__tested-range-slider-container_1"));
const optionsPanel1 = new OptionsPanel(optionsPanelContainer1, modelData1, viewData1);

const modelData2 = {
    minValue: -100,
    maxValue: 100,
    values: [0, 50],
    stepSize: 1,
    canPush: true,
};
const viewData2 = {
    sliderStripThickness: 12,
    handleWidth: 20,
    handleHeight: 20,
    borderThickness: 4,
    maxSegmentsCount: 6,
    scaleFontSize: 15,
    angle: 70,
    filledStrips: [true, false],
    isHandlesSeparated: false,
    hasTooltip: true,
    hasScale: true,
    scaleMargin: 30,
    hasOptions: true,
};
const optionsPanelContainer2 = <HTMLElement>(document.querySelector(".js-test-page__tested-range-slider-container_2"));
const optionsPanel2 = new OptionsPanel(optionsPanelContainer2, modelData2, viewData2);

const colorCustomizerContainer = <HTMLElement>(document.querySelector(".test-page__color-customizer"));
const colorCustomizer = new ColorCustomizer(colorCustomizerContainer);

const sliderWithPhysicContainer = <HTMLElement>(document.querySelector(".test-page__slider-with-physic"));
const sliderWithPhysic = new SliderWithPhysic(sliderWithPhysicContainer);
