import { SliderView } from "./MVP/Views/SliderView";
import { InputsView } from "./MVP/Views/InputsView";
import { ScaleView } from "./MVP/Views/ScaleView";
import { OptionsPanelView } from "./MVP/Views/OptionsPannelView";

import { Model } from "./MVP/Model/Model";
import { Presenter } from "./MVP/Presenter";

import { Options, IOptions } from "./MVP/Model/Options";

import "./RangeSlider.scss";

let sliderInstanceCount: number = 0;

export function createRangeSlider(containerSelector: string, options: IOptions): void {
    let defaultOptions: Options = new Options(options);

    defaultOptions.id = sliderInstanceCount;
    sliderInstanceCount++;

    let model = new Model(defaultOptions);

    let rangeSlidersContainer: HTMLElement = <HTMLElement>document.querySelector(containerSelector);
    let sliderContainer: HTMLElement = document.createElement("div");
    let inputsContainer: HTMLElement = document.createElement("div");
    let scaleContainer: HTMLElement = document.createElement("div");
    let optionsPanelContainer: HTMLElement = document.createElement("div");

    let elements = [
        rangeSlidersContainer,
        sliderContainer,
        inputsContainer,
        scaleContainer,
        optionsPanelContainer,
    ];
    render(elements);

    let sliderView: SliderView = new SliderView(sliderContainer);
    let inputsView: InputsView = new InputsView(defaultOptions, inputsContainer);
    let scaleView: ScaleView = new ScaleView(scaleContainer);
    let optionsPanelView: OptionsPanelView = new OptionsPanelView(optionsPanelContainer);

    let presenter: Presenter = new Presenter(model, sliderView, inputsView, scaleView, optionsPanelView);
};

function render(elements: HTMLElement[]): void {
    let [
        rangeSlidersContainer,
        sliderContainer,
        inputsContainer,
        scaleContainer,
        optionsPanelContainer,
    ] = elements;

    //плагин
    let rangeSlider: HTMLElement = document.createElement("div");
    rangeSlider.className = "range-slider";

    //слайдер
    sliderContainer.className = "range-slider__slider-container";

    //шкала
    scaleContainer.className = "range-slider__scale-container";

    //контейнер слайдер + шкала
    let mainContentContainer: HTMLElement = document.createElement("div");
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
}