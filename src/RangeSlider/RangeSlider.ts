import { SliderView } from "./MVP/Views/SliderView";
import { InputsView } from "./MVP/Views/InputsView";
import { ScaleView } from "./MVP/Views/ScaleView";
import { OptionsPanelView } from "./MVP/Views/OptionsPanelView";

import { Model } from "./MVP/Model/Model";
import { Presenter } from "./MVP/Presenter";

import { Options, IOptions } from "./MVP/Model/Options";

import "./RangeSlider.scss";

class RangeSlider {
    public static sliderInstanceCount: number = 0;

    static createRangeSlider(containerSelector: HTMLElement, options: IOptions): void {
        let defaultOptions: Options = new Options(options);

        defaultOptions.id = this.sliderInstanceCount;
        this.sliderInstanceCount++;

        let model = new Model(defaultOptions);

        let rangeSlidersContainer: HTMLElement = containerSelector;
        if (!rangeSlidersContainer)
            rangeSlidersContainer = document.createElement("div");
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
        this.render(elements);

        let sliderView: SliderView = new SliderView(sliderContainer);
        let inputsView: InputsView = new InputsView(inputsContainer);
        let scaleView: ScaleView = new ScaleView(scaleContainer);
        let optionsPanelView: OptionsPanelView = new OptionsPanelView(optionsPanelContainer);

        let presenter: Presenter = new Presenter(model, sliderView, inputsView, scaleView, optionsPanelView);
    };

    static render(elements: HTMLElement[]): void {
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

        //опции + инпуты
        let optionsContainer = document.createElement("div");
        optionsContainer.className = "range-slider__inputs-and-options-panel-container";

        //инпуты
        inputsContainer.className = "range-slider__inputs-container";

        //опции
        optionsPanelContainer.className = "range-slider__options-panel-container";
        optionsContainer.append(inputsContainer);
        optionsContainer.append(optionsPanelContainer);
        //rangeSlider.append(optionsContainer);

        rangeSlidersContainer.append(rangeSlider);
        rangeSlidersContainer.append(optionsContainer);
    }
}

export { RangeSlider };