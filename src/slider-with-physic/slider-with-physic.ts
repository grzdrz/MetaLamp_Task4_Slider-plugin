/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../plugin.ts";
import $ from "jquery";

import IModelData from "../RangeSlider/MVP/Model/Data/IModelData";
import IViewData from "../RangeSlider/MVP/Views/Data/IViewData";
import ModelData from "../RangeSlider/MVP/Model/Data/ModelData";
import ViewData from "../RangeSlider/MVP/Views/Data/ViewData";
import EventHandler from "../RangeSlider/Events/EventHandler";
import "./slider-with-physic.scss";

const modelData = {
    minValue: 0,
    maxValue: 1000,
    values: [1000],
    stepSize: 0.0000001,
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
    hasScale: false,
    hasTooltip: true,
    tooltipMargin: 10,
};
const G = -0.5;

class SliderWithPhysic {
    public containerElement: HTMLElement;

    public jqueryElement: JQuery<HTMLElement>;

    public setData: (modelData: IModelData, viewData: IViewData) => void;

    public getModelData: () => ModelData;

    public getViewData: () => ViewData;

    public subscribeOnHandleMove: (handler: EventHandler) => void;

    public subscribeOnMouseDown: (handler: EventHandler) => void;

    public subscribeOnMouseMove: (handler: EventHandler) => void;

    public subscribeOnMouseUp: (handler: EventHandler) => void;

    public velocity = 0;

    public readonly defaultDamping = 0.5;

    public damping = this.defaultDamping;

    public isHandleGripped = false;

    constructor(outerContainerElement: HTMLElement) {
        this.containerElement = document.createElement("div");
        this.containerElement.className = "slider-with-physic";
        outerContainerElement.append(this.containerElement);

        this.jqueryElement = $(this.containerElement).rangeSlider(modelData, viewData);
        this.setData = this.jqueryElement.data("setData");
        this.getModelData = this.jqueryElement.data("getModelData");
        this.getViewData = this.jqueryElement.data("getViewData");
        this.subscribeOnHandleMove = this.jqueryElement.data("subscribeOnHandleMove");
        this.subscribeOnMouseDown = this.jqueryElement.data("subscribeOnMouseDown");
        this.subscribeOnMouseMove = this.jqueryElement.data("subscribeOnMouseMove");
        this.subscribeOnMouseUp = this.jqueryElement.data("subscribeOnMouseUp");

        this.calculatePosition = this.calculatePosition.bind(this);
        this.handlerMouseDown = this.handlerMouseDown.bind(this);
        this.handlerMouseMove = this.handlerMouseMove.bind(this);
        this.handlerMouseUp = this.handlerMouseUp.bind(this);

        this.initialize();
    }

    initialize(): void {
        this.subscribeOnMouseDown(this.handlerMouseDown);
        this.subscribeOnMouseMove(this.handlerMouseMove);
        this.subscribeOnMouseUp(this.handlerMouseUp);
        this.calculatePosition();
    }

    calculatePosition() {
        const { values, minValue } = this.getModelData();
        if (!(this.velocity === 0 && values[0] === minValue)) {
            if (this.isHandleGripped) {
                this.velocity = 0;
                this.damping = this.defaultDamping;
                return;
            }

            if (values[0] <= minValue) {
                this.velocity *= (-1 * this.damping);
                this.damping -= 0.05;
            } else {
                this.velocity += G;
            }

            let newValue = values[0] + this.velocity - G / 2;

            // если скорость близка к нулю И смещение близко к полу, т.е. почти загашенное колебание, то обнуляем оба значения
            if (Math.abs(this.velocity) < Math.abs(G)) {
                this.velocity = 0;
                if (newValue <= Math.abs(G)) {
                    newValue = minValue;
                }
            }

            this.setData({ values: [newValue] }, {});

            requestAnimationFrame(this.calculatePosition);
        } else {
            this.damping = this.defaultDamping;
        }
    }

    private handlerMouseDown(): void {
        this.isHandleGripped = true;
    }

    private handlerMouseMove(): void {
        this.isHandleGripped = true;
    }

    private handlerMouseUp(): void {
        this.isHandleGripped = false;
        this.calculatePosition();
    }
}
export default SliderWithPhysic;
