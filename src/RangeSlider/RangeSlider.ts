import SliderView from "./MVP/Views/SliderView";
import InputsView from "./MVP/Views/InputsView";
import OptionsPanelView from "./MVP/Views/OptionsPanelView";

import Model from "./MVP/Model/Model";
import Presenter from "./MVP/Presenter";

import IOptions from "./MVP/Model/IOptions";
import Options from "./MVP/Model/Options";

import "./RangeSlider.scss";

class RangeSlider {
    public static sliderInstanceCount = 0;

    static createRangeSlider(containerSelector: HTMLElement, options: IOptions): Presenter {
        const defaultOptions: Options = new Options(options);
        defaultOptions.id = this.sliderInstanceCount;

        this.sliderInstanceCount += 1;
        const model = new Model(defaultOptions);

        let rangeSlidersContainer: HTMLElement = containerSelector;
        if (!rangeSlidersContainer) {
            rangeSlidersContainer = document.createElement("div");
        }
        const sliderContainer: HTMLElement = document.createElement("div");
        const inputsContainer: HTMLElement = document.createElement("div");
        const optionsPanelContainer: HTMLElement = document.createElement("div");

        const elements = [
            rangeSlidersContainer,
            sliderContainer,
            inputsContainer,
            optionsPanelContainer,
        ];
        this.render(elements);

        const sliderView: SliderView = new SliderView(sliderContainer);
        const inputsView: InputsView = new InputsView(inputsContainer);
        const optionsPanelView: OptionsPanelView = new OptionsPanelView(optionsPanelContainer);

        return new Presenter(model, sliderView, inputsView, optionsPanelView);
    }

    static render(elements: HTMLElement[]): void {
        const [
            rangeSlidersContainer,
            sliderContainer,
            inputsContainer,
            optionsPanelContainer,
        ] = elements;

        // плагин
        const rangeSlider: HTMLElement = document.createElement("div");
        rangeSlider.className = "range-slider";

        // слайдер
        sliderContainer.className = "range-slider__slider-container";

        // контейнер слайдер + шкала
        const mainContentContainer: HTMLElement = document.createElement("div");
        mainContentContainer.className = "range-slider__main-content-container";
        mainContentContainer.append(sliderContainer);
        // mainContentContainer.append(scaleContainer);
        rangeSlider.append(mainContentContainer);

        // опции + инпуты
        const optionsContainer = document.createElement("div");
        optionsContainer.className = "range-slider__inputs-and-options-panel-container";

        // инпуты
        inputsContainer.className = "range-slider__inputs-container";

        // опции
        optionsPanelContainer.className = "range-slider__options-panel-container";
        optionsContainer.append(inputsContainer);
        optionsContainer.append(optionsPanelContainer);

        rangeSlidersContainer.append(rangeSlider);
        rangeSlidersContainer.append(optionsContainer);
    }
}

export default RangeSlider;
