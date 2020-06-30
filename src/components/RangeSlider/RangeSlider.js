import { SliderView } from "./mvc/SliderView.js";
import { InputsView } from "./mvc/InputsView.js";
import { ScaleView } from "./mvc/ScaleView.js";

import { Model } from "./mvc/Model.js";
import { Controller } from "./mvc/Controller.js";

import "./RangeSlider.scss";

export function createRangeSlider(containerSelector) {
    let options = {
        sliderStripLength: 350,
        sliderStripThickness: 10,
        handleWidth: 16,
        handleHeight: 16,
        title: "some range slider",
        maxValue: 123,
        minValue: 0,
        borderThickness: 10,
        firstValue: 0,
        lastValue: 50,
        valueType: "₽",
        stepSize: 0.000001,
        orientation: "vertical",//vertical | horizontal
        hasTwoSlider: true,
        isInterval: true,
        maxSegmentsCount: 10,
    };
    let model = new Model(options);


    let rangeSlidersContainer = document.querySelector(containerSelector);

    let rangeSlider = document.createElement("div");
    rangeSlider.className = "range-slider";

    let titleContainer = document.createElement("div");
    titleContainer.className = "range-slider__title-container";
    rangeSlider.append(titleContainer);


    let sliderContainer = document.createElement("div");
    sliderContainer.className = "range-slider__slider-container";
    rangeSlider.append(sliderContainer);

    let scaleContainer = document.createElement("div");
    scaleContainer.className = "range-slider__scale-container";
    rangeSlider.append(scaleContainer);

    let mainContentContainer = document.createElement("div");
    mainContentContainer.className = "range-slider__main-content-container";
    if (options.orientation === "horizontal") {
        mainContentContainer.classList.add("range-slider__scale-container_horizontal");
    }
    else if (options.orientation === "vertical") {
        mainContentContainer.classList.add("range-slider__scale-container_vertical");
    }
    mainContentContainer.append(sliderContainer);
    mainContentContainer.append(scaleContainer);
    rangeSlider.append(mainContentContainer);


    let inputsContainer = document.createElement("div");
    inputsContainer.className = "range-slider__inputs-container";
    rangeSlider.append(inputsContainer);

    rangeSlidersContainer.append(rangeSlider);

    let sliderView = new SliderView(options, sliderContainer);

    let inputsView = new InputsView(options, inputsContainer);

    let scaleView = new ScaleView(options, scaleContainer);

    let controller = new Controller(model, sliderView, inputsView, scaleView);
};