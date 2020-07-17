import ViewData from "./ViewData";

import SliderView from "./SliderView/SliderView";
import InputsView from "./InputsView/InputsView";
import OptionsPanelView from "./OptionsPanel/OptionsPanelView";
import ViewDataEventArgs from "../../Events/ViewDataEventArgs";

class ViewManager {
    public viewData: ViewData;

    public containerElement: HTMLElement;

    public sliderView: SliderView;

    public inputsView: InputsView;

    public optionsPanelView: OptionsPanelView;

    constructor(viewData: ViewData, containerElement: HTMLElement) {
        this.viewData = viewData;
        this.containerElement = containerElement;

        const sliderContainer: HTMLElement = document.createElement("div");
        const inputsContainer: HTMLElement = document.createElement("div");
        const optionsPanelContainer: HTMLElement = document.createElement("div");
        this.sliderView = new SliderView(sliderContainer, this);
        this.inputsView = new InputsView(inputsContainer, this);
        this.optionsPanelView = new OptionsPanelView(optionsPanelContainer, this);
    }

    public initialize(): void {
        this.render();
    }

    public render(): void {
        // плагин
        const rangeSlider: HTMLElement = document.createElement("div");
        rangeSlider.className = "range-slider";

        // слайдер
        this.sliderView.containerElement.className = "range-slider__slider-container";

        // контейнер слайдер + шкала
        const mainContentContainer: HTMLElement = document.createElement("div");
        mainContentContainer.className = "range-slider__main-content-container";
        mainContentContainer.append(this.sliderView.containerElement);
        rangeSlider.append(mainContentContainer);

        // опции + инпуты
        const optionsContainer = document.createElement("div");
        optionsContainer.className = "range-slider__inputs-and-options-panel-container";

        // инпуты
        this.inputsView.containerElement.className = "range-slider__inputs-container";

        // опции
        this.optionsPanelView.containerElement.className = "range-slider__options-panel-container";
        optionsContainer.append(this.inputsView.containerElement);
        optionsContainer.append(this.optionsPanelView.containerElement);

        this.containerElement.append(rangeSlider);
        this.containerElement.append(optionsContainer);
    }

    getData(args: ViewDataEventArgs): void {
        args.data = new ViewData(this.viewData);
    }
}

export default ViewManager;
