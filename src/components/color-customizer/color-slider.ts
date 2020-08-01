/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../../plugin.ts";
import $ from "jquery";

import IModelData from "../../RangeSlider/MVP/Model/Data/IModelData";
import IViewData from "../../RangeSlider/MVP/Views/Data/IViewData";
import ModelData from "../../RangeSlider/MVP/Model/Data/ModelData";
import ViewData from "../../RangeSlider/MVP/Views/Data/ViewData";
import EventHandler from "../../RangeSlider/Events/EventHandler";
import ColorCustomizer from "./color-customizer";

const modelData = {
    minValue: 0,
    maxValue: 255,
    values: [50],
    stepSize: 1,
    /* canPush: true, */
};
const viewData = {
    sliderStripThickness: 10,
    handleWidth: 15,
    handleHeight: 15,
    borderThickness: 5,
    maxSegmentsCount: 1,
    scaleFontSize: 15,
    angle: 90,
    filledStrips: [false, false],
    /* isHandlesSeparated: false, */
    hasScale: false,
    hasTooltip: true,
    scaleMargin: 30,
};
class ColorSlider {
    public containerElement: HTMLElement;

    public manager: ColorCustomizer;

    public jqueryElement: JQuery<HTMLElement>;

    public setData: (modelData: IModelData, viewData: IViewData) => void;

    public getModelData: () => ModelData;

    public getViewData: () => ViewData;

    public subscribeOnHandleMove: (handler: EventHandler) => void;

    public color = 0;

    constructor(manager: ColorCustomizer, containerElement: HTMLElement) {
        this.manager = manager;
        this.containerElement = containerElement;

        this.jqueryElement = $(this.containerElement).rangeSlider(modelData, viewData);
        this.setData = this.jqueryElement.data("setData");
        this.getModelData = this.jqueryElement.data("getModelData");
        this.getViewData = this.jqueryElement.data("getViewData");
        this.subscribeOnHandleMove = this.jqueryElement.data("subscribeOnHandleMove");

        this.handlerChangeColor = this.handlerChangeColor.bind(this);

        this.initialize();
    }

    initialize(): void {
        this.subscribeOnHandleMove(this.handlerChangeColor);

        const { values } = this.getModelData();
        // eslint-disable-next-line prefer-destructuring
        this.color = values[0];
    }

    handlerChangeColor(): void {
        const { values } = this.getModelData();
        // eslint-disable-next-line prefer-destructuring
        this.color = values[0];
        this.manager.changeSquareColor();
    }
}

export default ColorSlider;
