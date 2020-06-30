import { SliderView } from "./mvc/SliderView.js";
import { InputsView } from "./mvc/InputsView.js";
import { ScaleView } from "./mvc/ScaleView.js";
import { OptionsPanelView } from "./mvc/OptionsPannelView.js";

import { Model } from "./mvc/Model.js";
import { Controller } from "./mvc/Controller.js";

import "./RangeSlider.scss";

export function createRangeSlider(containerSelector, options) {
    let model = new Model(options);


    let rangeSlidersContainer = document.querySelector(containerSelector);

    //плагин
    let rangeSlider = document.createElement("div");
    rangeSlider.className = "range-slider";
    if (options.orientation === "horizontal") {
        rangeSlider.classList.add("range-slider_horizontal");
    }
    else if (options.orientation === "vertical") {
        rangeSlider.classList.add("range-slider_vertical");
    }

    //титульник
    let titleContainer = document.createElement("div");
    titleContainer.className = "range-slider__title-container";
    rangeSlider.append(titleContainer);


    //слайдер
    let sliderContainer = document.createElement("div");
    sliderContainer.className = "range-slider__slider-container";
    rangeSlider.append(sliderContainer);

    //шкала
    let scaleContainer = document.createElement("div");
    scaleContainer.className = "range-slider__scale-container";
    rangeSlider.append(scaleContainer);

    //слайдер + шкала
    let mainContentContainer = document.createElement("div");
    mainContentContainer.className = "range-slider__main-content-container";
    if (options.orientation === "horizontal") {
        mainContentContainer.classList.add("range-slider__main-content-container_horizontal");
    }
    else if (options.orientation === "vertical") {
        mainContentContainer.classList.add("range-slider__main-content-container_vertical");
    }
    mainContentContainer.append(sliderContainer);
    mainContentContainer.append(scaleContainer);
    rangeSlider.append(mainContentContainer);


    //инпуты
    let inputsContainer = document.createElement("div");
    inputsContainer.className = "range-slider__inputs-container";

    //инпуты + опции
    let optionsPanelContainer = document.createElement("div");
    optionsPanelContainer.className = "range-slider__options-panel-container";
    if (options.orientation === "horizontal") {
        optionsPanelContainer.classList.add("range-slider__options-panel-container_horizontal");
    }
    else if (options.orientation === "vertical") {
        optionsPanelContainer.classList.add("range-slider__options-panel-container_vertical");
    }
    optionsPanelContainer.append(inputsContainer);
    rangeSlider.append(optionsPanelContainer);

    rangeSlidersContainer.append(rangeSlider);

    let sliderView = new SliderView(options, sliderContainer);

    let inputsView = new InputsView(options, inputsContainer);

    let scaleView = new ScaleView(options, scaleContainer);

    let optionsPanelView = new OptionsPanelView(options, optionsPanelContainer);

    let controller = new Controller(model, sliderView, inputsView, scaleView, optionsPanelView);
};