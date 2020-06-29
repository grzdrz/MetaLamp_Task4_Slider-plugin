import { SliderView } from "./mvc/SliderView.js";
import { InputsView } from "./mvc/InputsView.js";
/* import { View } from "./mvc/View.js"; */
import { Model } from "./mvc/Model.js";
import { Controller } from "./mvc/Controller.js";
/* let controller = new Controller(); */

/* import { getRangeSlider } from "./RangeSlider.pug"; */

import "./RangeSlider.scss";

export function createRangeSlider(containerSelector) {
    let rangeSlidersContainer = document.querySelector(containerSelector);

    let rangeSlider = document.createElement("div");
    rangeSlider.className = "range-slider";

    let titleContainer = document.createElement("div");
    titleContainer.className = "range-slider__title-container";
    rangeSlider.append(titleContainer);

    let mainContentContainer = document.createElement("div");
    mainContentContainer.className = "range-slider__slider-container";
    rangeSlider.append(mainContentContainer);

    let inputsContainer = document.createElement("div");
    inputsContainer.className = "range-slider__inputs-container";
    rangeSlider.append(inputsContainer);

    rangeSlidersContainer.append(rangeSlider);


    let options = {
        sliderStripLength: 350,
        sliderStripThickness: 10,
        handleWidth: 16,
        handleHeight: 16, 
        title: "some range slider",
        maxValue: 100,
        minValue: 0,
        borderThickness: 10,
        firstValue: 0,
        lastValue: 100,
        valueType: "₽",
        stepSize: 0.0000001,
        orientation: "vertical",//vertical | horizontal
        hasTwoSlider: true,
        isInterval: true,
    };
    let model = new Model(options);

    let sliderView = new SliderView(options, mainContentContainer);

    let inputsView = new InputsView(options, inputsContainer);

    let controller = new Controller(model, sliderView, inputsView);
};