/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../plugin.ts";
import $ from "jquery";
import "./TestPage.scss";
import OptionsPanel from "../components/options-panel/OptionsPanel";
import ColorCustomizer from "../components/color-customizer/color-customizer";
import SliderWithPhysic from "../components/slider-with-physic/slider-with-physic";

/* const jqSlider1 = $(".js-test-page__tested-range-slider-container_1").rangeSlider(modelData, viewData); */
const optionsPanelContainer1 = <HTMLElement>(document.querySelector(".js-test-page__tested-range-slider-container_1"));
const optionsPanel1 = new OptionsPanel(optionsPanelContainer1/* jqSlider1, jqSlider1[0] */);

const colorCustomizerContainer = <HTMLElement>(document.querySelector(".test-page__color-customizer"));
const colorCustomizer = new ColorCustomizer(colorCustomizerContainer);

const sliderWithPhysicContainer = <HTMLElement>(document.querySelector(".test-page__slider-with-physic"));
const sliderWithPhysic = new SliderWithPhysic(sliderWithPhysicContainer);
