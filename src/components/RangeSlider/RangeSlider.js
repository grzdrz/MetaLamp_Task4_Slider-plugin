import { SliderView } from "./mvc/SliderView.js";
import { InputsView } from "./mvc/InputsView.js";
import { ScaleView } from "./mvc/ScaleView.js";
import { OptionsPanelView } from "./mvc/OptionsPannelView.js";

import { Model } from "./mvc/Model.js";
import { Controller } from "./mvc/Controller.js";

import "./RangeSlider.scss";

let sliderInstanceCount = 0;

const defaultOptions = {
    sliderStripLength: 500,
    sliderStripThickness: 10,
    handleWidth: 15,
    handleHeight: 15,
    minValue: -100,
    maxValue: 100,
    borderThickness: 5,
    firstValue: 0,
    lastValue: 50,
    stepSize: 10,
    orientation: "horizontal",// vertical | horizontal
    hasTwoSlider: false,
    isInterval: true,
    maxSegmentsCount: 10,
    scaleFontSize: 20,
};

export function createRangeSlider(containerSelector, options) {
    for (let optionName in options) {
        defaultOptions[optionName] = options[optionName];
    }
    defaultOptions.id = sliderInstanceCount;
    sliderInstanceCount++;

    let model = new Model(defaultOptions);

    let rangeSlidersContainer = document.querySelector(containerSelector);
    let sliderContainer = document.createElement("div");
    let inputsContainer = document.createElement("div");
    let scaleContainer = document.createElement("div");
    let optionsPanelContainer = document.createElement("div");
    _render({
        rangeSlidersContainer: rangeSlidersContainer,
        sliderContainer: sliderContainer,
        inputsContainer: inputsContainer,
        scaleContainer: scaleContainer,
        optionsPanelContainer: optionsPanelContainer,
    });

    let sliderView = new SliderView(sliderContainer);
    let inputsView = new InputsView(defaultOptions, inputsContainer);
    let scaleView = new ScaleView(scaleContainer);
    let optionsPanelView = new OptionsPanelView(optionsPanelContainer);

    let controller = new Controller(model, sliderView, inputsView, scaleView, optionsPanelView);
};

function _render(elements) {
    let {
        rangeSlidersContainer,
        sliderContainer,
        inputsContainer,
        scaleContainer,
        optionsPanelContainer,
    } = elements;

    //плагин
    let rangeSlider = document.createElement("div");
    rangeSlider.className = "range-slider";
    if (defaultOptions.orientation === "horizontal") {
        rangeSlider.classList.add("range-slider_horizontal");
    }
    else if (defaultOptions.orientation === "vertical") {
        rangeSlider.classList.add("range-slider_vertical");
    }

    //титульник
    let titleContainer = document.createElement("div");
    titleContainer.className = "range-slider__title-container";
    rangeSlider.append(titleContainer);


    //слайдер
    /* sliderContainer = document.createElement("div"); */
    sliderContainer.className = "range-slider__slider-container";
    //rangeSlider.append(sliderContainer);

    //шкала
    /* scaleContainer = document.createElement("div"); */
    scaleContainer.className = "range-slider__scale-container";
    //rangeSlider.append(scaleContainer);

    //слайдер + шкала
    let mainContentContainer = document.createElement("div");
    mainContentContainer.className = "range-slider__main-content-container";
    if (defaultOptions.orientation === "horizontal") {
        mainContentContainer.classList.add("range-slider__main-content-container_horizontal");
    }
    else if (defaultOptions.orientation === "vertical") {
        mainContentContainer.classList.add("range-slider__main-content-container_vertical");
    }
    mainContentContainer.append(sliderContainer);
    mainContentContainer.append(scaleContainer);
    rangeSlider.append(mainContentContainer);


    //инпуты
    /* inputsContainer = document.createElement("div"); */
    inputsContainer.className = "range-slider__inputs-container";

    //инпуты + опции
    /* optionsPanelContainer = document.createElement("div"); */
    optionsPanelContainer.className = "range-slider__options-panel-container";
    if (defaultOptions.orientation === "horizontal") {
        optionsPanelContainer.classList.add("range-slider__options-panel-container_horizontal");
    }
    else if (defaultOptions.orientation === "vertical") {
        optionsPanelContainer.classList.add("range-slider__options-panel-container_vertical");
    }
    optionsPanelContainer.append(inputsContainer);
    rangeSlider.append(optionsPanelContainer);

    rangeSlidersContainer.append(rangeSlider);
}