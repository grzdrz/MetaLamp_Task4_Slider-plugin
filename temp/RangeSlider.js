/* import { SliderView } from "./MVP/Views/SliderView.js";
import { InputsView } from "./MVP/Views/InputsView.js";
import { ScaleView } from "./MVP/Views/ScaleView.js";
import { OptionsPanelView } from "./MVP/Views/OptionsPannelView.js";

import { Model } from "./MVP/Model.js";
import { Presenter } from "./MVP/Presenter.js";

import { Options} from "./Options.js";

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
    hasTwoSlider: false,
    isInterval: true,
    maxSegmentsCount: 10,
    scaleFontSize: 20,
    angle: 0,
    get angleInRad() {
        return this.angle * (Math.PI / 180);
    },
};

export function createRangeSlider(containerSelector, options) {
    let defaultOptions = new Options(options);

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

    let presenter = new Presenter(model, sliderView, inputsView, scaleView, optionsPanelView);
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

    //слайдер
    sliderContainer.className = "range-slider__slider-container";

    //шкала
    scaleContainer.className = "range-slider__scale-container";

    //контейнер слайдер + шкала
    let mainContentContainer = document.createElement("div");
    mainContentContainer.className = "range-slider__main-content-container";
    mainContentContainer.append(sliderContainer);
    mainContentContainer.append(scaleContainer);
    rangeSlider.append(mainContentContainer);


    //инпуты
    inputsContainer.className = "range-slider__inputs-container";

    //контейнер инпуты + опции
    optionsPanelContainer.className = "range-slider__options-panel-container";
    optionsPanelContainer.append(inputsContainer);
    rangeSlider.append(optionsPanelContainer);

    rangeSlidersContainer.append(rangeSlider);
} */