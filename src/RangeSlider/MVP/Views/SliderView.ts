import { View } from "./View";

import { SliderPart } from "./SliderParts/SliderPart";
import { SlidersContainer } from "./SliderParts/SliderContainer";
import { Handle } from "./SliderParts/Handle";
import { FilledStrip } from "./SliderParts/FilledStrip";
import { EmptyStrip } from "./SliderParts/EmptyStrip";

import { MathFunctions } from "../../Helpers/MathFunctions";
import { Vector } from "../../Helpers/Vector";
import { Options, IOptions } from "../Model/Options";

import { Event } from "../../Events/Event";
import { OptionsToUpdateEventArgs, EventArgs } from "../../Events/EventArgs";

export class SliderView extends View {

    public containerElement: HTMLElement;
    public firstSlider: HTMLElement | undefined;
    public lastSlider: HTMLElement | undefined;
    public filledStrip: HTMLElement | undefined;
    public emptyStrip: HTMLElement | undefined;

    public firstSliderBorder: HTMLElement | undefined;
    public lastSliderBorder: HTMLElement | undefined;

    public containerElementInstance: SlidersContainer | undefined;
    public firstSliderInstance: Handle | undefined;
    public lastSliderInstance: Handle | undefined;
    public filledStripInstance: FilledStrip | undefined;
    public emptyStripInstance: EmptyStrip | undefined;

    private _sliderParts: SliderPart[];



    public onHandleMove: Event = new Event();

    constructor(mainContentContainer: HTMLElement) {
        super();

        this.containerElement = mainContentContainer;

        this._handlerMouseDown = this._handlerMouseDown.bind(this);

        this._sliderParts = [];
    }

    initialize() {
        this._render();
    }

    update(neededRerender: boolean) {
        if (neededRerender) {//полный перерендер всех элементов слайдера
            this._render();
        }
        else {//или просто обновление их состояний
            for (let part of this._sliderParts) {/////
                if (part.render) part.render();
            }
        }
    }

    _render() {
        let modelData = this.getModelData();
        this._sliderParts = [];

        this.containerElement.innerHTML = "";

        this.emptyStrip = document.createElement("div");
        this.emptyStrip.className = "range-slider__slider-body-empty";
        this.containerElement.append(this.emptyStrip);

        this.filledStrip = document.createElement("div");
        this.filledStrip.className = "range-slider__slider-body-filled";
        this.containerElement.append(this.filledStrip);

        this.firstSliderBorder = document.createElement("div");
        this.firstSliderBorder.className = "range-slider__first-slider-outside";
        this.firstSliderBorder.dataset.sliderCountNumber = "1";
        this.containerElement.append(this.firstSliderBorder);
        if (modelData.hasTwoSlider) {
            this.lastSliderBorder = document.createElement("div");
            this.lastSliderBorder.className = "range-slider__last-slider-outside";
            this.lastSliderBorder.dataset.sliderCountNumber = "2";
            this.containerElement.append(this.lastSliderBorder);
        }


        this.firstSlider = document.createElement("div");
        this.firstSlider.className = "range-slider__first-slider";
        this.firstSlider.dataset.sliderCountNumber = "1";
        this.firstSlider.style.width = `${modelData.handleWidth}px`;
        this.firstSlider.style.height = `${modelData.handleHeight}px`;
        this.containerElement.append(this.firstSlider);
        if (modelData.hasTwoSlider) {
            this.lastSlider = document.createElement("div");
            this.lastSlider.className = "range-slider__last-slider";
            this.lastSlider.dataset.sliderCountNumber = "2";
            this.lastSlider.style.width = `${modelData.handleWidth}px`;
            this.lastSlider.style.height = `${modelData.handleHeight}px`;
            this.containerElement.append(this.lastSlider);

            if (!modelData.lastValue) throw new Error("values not exist");
            if (modelData.lastValue < modelData.firstValue) {
                /* this.onModelOptionUpdate({
                    lastValue: modelData.firstValue,
                }); */
                //this.onModelOptionUpdate. ;
            }
        }


        this.containerElementInstance = new SlidersContainer(this, this.containerElement);
        this._sliderParts.push(this.containerElementInstance);

        this.firstSliderInstance = new Handle(this, this.firstSlider, this.firstSliderBorder, 1);
        this._sliderParts.push(this.firstSliderInstance);

        if (modelData.hasTwoSlider && this.lastSlider && this.lastSliderBorder) {
            this.lastSliderInstance = new Handle(this, this.lastSlider, this.lastSliderBorder, 2);
            this._sliderParts.push(this.lastSliderInstance);
        }

        this.emptyStripInstance = new EmptyStrip(this, this.emptyStrip);
        this._sliderParts.push(this.emptyStripInstance);

        this.filledStripInstance = new FilledStrip(this, this.filledStrip);
        this._sliderParts.push(this.filledStripInstance);

        for (let part of this._sliderParts) {/////
            if (part.initialize) part.initialize();
        }

        this.firstSliderInstance.DOMElement.ondragstart = function () {
            return false;
        };
        this.firstSliderInstance.DOMElement.addEventListener("mousedown", this._handlerMouseDown);
        //this.firstSliderInstance.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
        this.firstSliderInstance.backgroundDOMElement.addEventListener("mousedown", (event: MouseEvent) => {
            this._handlerMouseDown(event);
        });
        /* this.firstSliderInstance.outsideDOMElement.addEventListener("touchstart", (event: MouseEvent) => {
            this._handlerMouseDown(event);
        }); */

        if (modelData.hasTwoSlider && this.lastSliderInstance) {
            this.lastSliderInstance.DOMElement.ondragstart = function () {
                return false;
            };
            this.lastSliderInstance.DOMElement.addEventListener("mousedown", this._handlerMouseDown);
            //this.lastSliderInstance.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
            this.lastSliderInstance.backgroundDOMElement.addEventListener("mousedown", (event: MouseEvent) => {
                this._handlerMouseDown(event);
            });
            /* this.lastSliderInstance.outsideDOMElement.addEventListener("touchstart", (event: MouseEvent) => {
                this._handlerMouseDown(event);
            }); */
        }
        /* this._setEventHandlers(modelData); */
    }

    //d&d
    _handlerMouseDown(event: MouseEvent) {
        event.preventDefault();

        let modelData = this.getModelData();
        let cursorMouseDownPositionX;
        let cursorMouseDownPositionY;
        if (event instanceof TouchEvent) {
            cursorMouseDownPositionX = event.changedTouches[0].pageX;
            cursorMouseDownPositionY = event.changedTouches[0].pageY
        }
        else {
            cursorMouseDownPositionX = event.clientX;
            cursorMouseDownPositionY = event.clientY;
        }
        cursorMouseDownPositionY = (document.documentElement.clientHeight + pageYOffset) - cursorMouseDownPositionY;
        //cursorMouseDownPositionX =;
        let cursorMouseDownPosition = new Vector(cursorMouseDownPositionX, cursorMouseDownPositionY);//место нажатия левой кнопки мыши 

        let sliderCountNumber: number = 0;
        if (event.currentTarget !== null) {////////////////////
            let sliderCountNumberString = (<HTMLElement>event.currentTarget).dataset.sliderCountNumber;
            if (sliderCountNumberString !== undefined)
                sliderCountNumber = Number.parseInt(sliderCountNumberString);
        }
        let targetSliderInstance;
        let targetHandleCountNumber;
        if (sliderCountNumber === 1) {
            targetSliderInstance = this.firstSliderInstance;
            targetHandleCountNumber = 1;
        }
        else if (modelData.hasTwoSlider) {
            targetSliderInstance = this.lastSliderInstance;
            targetHandleCountNumber = 2;
        }
        if (!targetSliderInstance || targetHandleCountNumber === undefined) throw new Error("handle not exist");

        let targetSliderBoundingCoords = targetSliderInstance.DOMElement.getBoundingClientRect();
        let mousePositionInsideTargetSliderX = cursorMouseDownPosition.x - targetSliderBoundingCoords.x;
        let mousePositionInsideTargetSliderY = cursorMouseDownPosition.y - (document.documentElement.clientHeight + pageYOffset - targetSliderBoundingCoords.y - targetSliderInstance.size.height/* targetSliderBoundingCoords.height */);
        let mousePositionInsideTargetSlider = new Vector(mousePositionInsideTargetSliderX, mousePositionInsideTargetSliderY);


        let optionsForMouseEvents = {
            handlerMouseMove: (/* optionsFromMouseDown: IMouseEventArgs,  */event: MouseEvent): void => { },
            handlerMouseUp: (/* optionsFromMouseDown: IMouseEventArgs,  */event: MouseEvent): void => { },
            mousePositionInsideTargetSlider: mousePositionInsideTargetSlider,
            targetSliderInstance: targetSliderInstance,
            targetHandleCountNumber: targetHandleCountNumber,
        };
        let handlerMouseMove = this._handlerMouseMove.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseMove = handlerMouseMove;// чтобы обработчик mouseMove можно было отписать в mouseUp

        let handlerMouseUp = this._handlerMouseUp.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseUp = handlerMouseUp;// -//-

        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
        /* document.addEventListener("touchmove", handlerMouseMove);
        document.addEventListener("touchend", handlerMouseUp); */
    }

    _handlerMouseMove(optionsFromMouseDown: IMouseEventArgs, event: MouseEvent) {
        let modelData = this.getModelData();
        let {
            mousePositionInsideTargetSlider,
            targetSliderInstance,
            targetHandleCountNumber,
        } = optionsFromMouseDown;

        let mouseGlobalPositionX;
        let mouseGlobalPositionY;
        if (event instanceof TouchEvent) {
            mouseGlobalPositionX = event.changedTouches[0].pageX;
            mouseGlobalPositionY = event.changedTouches[0].pageY
        }
        else {
            mouseGlobalPositionX = event.clientX;
            mouseGlobalPositionY = event.clientY;
        }
        mouseGlobalPositionY = (document.documentElement.clientHeight + pageYOffset) - mouseGlobalPositionY;
        //mouseGlobalPositionX =;
        let mouseGlobalPosition = new Vector(mouseGlobalPositionX, mouseGlobalPositionY);//место нажатия левой кнопки мыши 

        //значение в заданных единицах пропорциональное пиксельным координатам курсора в контейнере
        this._calculateValueProportionalToPixelValue({
            modelData,
            mouseGlobalPosition,
            mousePositionInsideTargetSlider,
            targetHandleCountNumber
        });
    }

    _handlerMouseUp(optionsFromMouseDown: IMouseEventArgs, event: MouseEvent) {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
        /*         document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
                document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp); */
    }

    _calculateValueProportionalToPixelValue(args: IValueToPixelArgs): void {
        let {
            modelData,
            mouseGlobalPosition,
            mousePositionInsideTargetSlider,
            targetHandleCountNumber
        } = args;

        if (!this.firstSliderInstance) throw new Error("firstSliderInstance not exist");
        if (!this.containerElementInstance) throw new Error("containerElementInstance not exist");

        let containerBoundingRect = this.containerElementInstance.DOMElement.getBoundingClientRect();
        let containerCoord = new Vector(
            containerBoundingRect.x,
            (document.documentElement.clientHeight + pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height)
        );
        let cursorPositionInContainer = mouseGlobalPosition.subtract(containerCoord).subtract(mousePositionInsideTargetSlider);
        let containerCapacity;
        if (modelData.hasTwoSlider) {
            if (targetHandleCountNumber === 2) {
                let vectorizedHandleWidth = Vector.calculateVector(this.firstSliderInstance.size.width, modelData.angleInRad);
                cursorPositionInContainer = cursorPositionInContainer.subtract(vectorizedHandleWidth);
            }
            containerCapacity = modelData.sliderStripLength - this.firstSliderInstance.size.width * 2;
        }
        else {
            containerCapacity = modelData.sliderStripLength - this.firstSliderInstance.size.width;
        }

        let mainAxisVector = Vector.calculateVector(modelData.sliderStripLength, modelData.angleInRad);
        let cursorPositionProjectionOnSliderMainAxis = cursorPositionInContainer.calculateVectorProjectionOnTargetVector(mainAxisVector);

        let proportionalValue = (modelData.deltaMaxMin * cursorPositionProjectionOnSliderMainAxis) / (containerCapacity) + modelData.minValue;
        if (targetHandleCountNumber === 1)
            this.onHandleMove.invoke(new OptionsToUpdateEventArgs({ firstValue: proportionalValue }));
        else
            this.onHandleMove.invoke(new OptionsToUpdateEventArgs({ lastValue: proportionalValue }));
    }
}



interface IMouseEventArgs {
    handlerMouseMove: (/* optionsFromMouseDown: IMouseEventArgs,  */event: MouseEvent) => void,
    handlerMouseUp: (/* optionsFromMouseDown: IMouseEventArgs,  */event: MouseEvent) => void,
    mousePositionInsideTargetSlider: Vector,
    targetSliderInstance: Handle/* any */,
    targetHandleCountNumber: number,
}

interface IValueToPixelArgs {
    modelData: Options,
    mouseGlobalPosition: Vector,
    mousePositionInsideTargetSlider: Vector,
    targetHandleCountNumber: number
}