import ViewData from "./ViewData";

import SliderView from "./SliderView/SliderView";
import InputsView from "./InputsView/InputsView";
import OptionsPanelView from "./OptionsPanel/OptionsPanelView";
import ViewDataEventArgs from "../../Events/ViewDataEventArgs";
import IViewData from "./IViewData";

class ViewManager {
    public viewData: ViewData;

    public sliderView: SliderView;

    public inputsView: InputsView;

    public optionsPanelView: OptionsPanelView;

    private containerElement: HTMLElement;

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

    public updateData(data: IViewData): void {
        this.viewData.sliderStripThickness = (data.sliderStripThickness !== undefined ? data.sliderStripThickness : this.viewData.sliderStripThickness);
        this.viewData.handleWidth = (data.handleWidth !== undefined ? data.handleWidth : this.viewData.handleWidth);
        this.viewData.handleHeight = (data.handleHeight !== undefined ? data.handleHeight : this.viewData.handleHeight);
        this.viewData.borderThickness = (data.borderThickness !== undefined ? data.borderThickness : this.viewData.borderThickness);
        this.viewData.maxSegmentsCount = (data.maxSegmentsCount !== undefined ? data.maxSegmentsCount : this.viewData.maxSegmentsCount);
        this.viewData.scaleFontSize = (data.scaleFontSize !== undefined ? data.scaleFontSize : this.viewData.scaleFontSize);
        this.viewData.angle = (data.angle !== undefined ? data.angle : this.viewData.angle);
        this.viewData.filledStrips = (data.filledStrips !== undefined ? data.filledStrips : this.viewData.filledStrips);
        this.viewData.hasScale = (data.hasScale !== undefined ? data.hasScale : this.viewData.hasScale);
    }

    public getData(args: ViewDataEventArgs): void {
        args.data = new ViewData(this.viewData);
    }

    public initialize(): void {
        this.render();
    }

    private render(): void {
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
}

export default ViewManager;
