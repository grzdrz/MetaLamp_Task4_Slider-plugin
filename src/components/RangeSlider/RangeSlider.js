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
        thicknessOfSliderBorder: 2,
        firstValue: 0,
        lastValue: 100,
        valueType: "₽",
        stepSize: 0.0000001,
        hasTwoSlider: true,
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



//Пропорция
//(x1_input - xMin_input) / d_MaxMin_input = x_slider / d_MaxMin_slider;


//функции расчета пропорциональных друг другу значений инпутов и X координат ползунков(в пикселях).
//x1_input = (d_MaxMin_input * x_slider) / d_MaxMin_slider + xMin_input;
//x1_slider = ((x_input - xMin_input) * d_MaxMin_slider) / d_MaxMin_input;
//x2_input = (d_MaxMin_input * x_slider) / d_MaxMin_slider + xMin_input;
//x2_slider = ((x_input - xMin_input) * d_MaxMin_slider) / d_MaxMin_input + slider_width;
//где: 
//  x_input - текущее значение инпута,
//  x_slider - текущая X координата ползунка относительно левой границы контейнера(левый марджин),
//  xMin_input/xMax_input - минимальные/максимальные значения инпутов,
//  xMin_slider/xMax_slider - минимальные/максимальные X координаты ползунков,
//  d_... - приращения соответствующих величин

//Вышеописанные формулы расчета устроены так что бы соответствовать следующим условиям:
// 1)Значение инпута соответсвующего 2му ползунку расчитывается относительно визуального положения левой границы 2го ползунка.
// 2)Значение инпута соответсвующего 1му ползунку расчитывается относительно визуального положения правой границы 1го ползунка.
//Это нужно чтобы при смыкании ближайших друг к другу границ ползунков их соответствующие значения инпутов были равны
//(т.е. при смыкании ползунков дельта инпут === 0). При этом если развести ползунки по крайним границам, то значения их
//соответствующих инпутов будут равны крайним значениям инпутов. 

//На деле чтобы достичь такого эффекта расчет пропорций ведется от левой границы 1го ползунка и 
//левой границы 2го ползунка минус ширина ползунка.