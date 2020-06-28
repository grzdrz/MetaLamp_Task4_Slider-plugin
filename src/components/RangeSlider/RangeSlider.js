import { SliderView } from "./mvc/SliderView.js";
import { InputsView } from "./mvc/InputsView.js";
/* import { View } from "./mvc/View.js"; */
import { Model } from "./mvc/Model.js";
import { Controller } from "./mvc/Controller.js";
/* let controller = new Controller(); */

let rangeSliders = document.querySelectorAll(".range-slider");
rangeSliders.forEach(e => {
    //типо создали элементы для ренж слайдера
    let slidersContainer = e.querySelector(".range-slider__slider-container");
    let firstSlider = e.querySelector(".range-slider__first-slider");
    let firstSliderBorder = e.querySelector(".range-slider__first-slider-outside");
    let lastSlider = e.querySelector(".range-slider__last-slider");
    let lastSliderBorder = e.querySelector(".range-slider__last-slider-outside");
    let firstInput = e.querySelector(".range-slider__first-input");
    let lastInput = e.querySelector(".range-slider__last-input");
    let filledStrip = e.querySelector(".range-slider__slider-body-filled");
    let emptyStrip = e.querySelector(".range-slider__slider-body-empty");


    let model = new Model({
        maxValue: 100,
        minValue: 0,
        borderThickness: 10,
        firstValue: 0,
        lastValue: 100,
        valueType: "₽",
        stepSize: 0.0000001,
        orientation: "horizontal",//vertical | horizontal
        hasTwoSlider: false,
        isInterval: true,
    });

    let sliderView = new SliderView({
        sliderComponent: e,
        slidersContainer: slidersContainer,

        firstSlider: firstSlider,
        firstSliderBorder: firstSliderBorder,

        lastSlider: lastSlider,
        lastSliderBorder: lastSliderBorder,

        emptyStrip: emptyStrip,
        filledStrip: filledStrip,
    });

    let inputsView = new InputsView({
        firstInput: firstInput,
        lastInput: lastInput,
    });

    let controller = new Controller(model, sliderView, inputsView);
});
import "./RangeSlider.scss";