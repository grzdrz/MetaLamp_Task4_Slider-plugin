import { View } from "./View";

import { SliderPart } from "./SliderParts/SliderPart";
import { SliderContainer } from "./SliderParts/SliderContainer";
import { Handle } from "./SliderParts/Handle";
import { FilledStrip } from "./SliderParts/FilledStrip";
import { EmptyStrip } from "./SliderParts/EmptyStrip";

import { MathFunctions } from "../../Helpers/MathFunctions";
import { Vector } from "../../Helpers/Vector";
import { Options, IOptions } from "../Model/Options";

import { Event } from "../../Events/Event";
import { OptionsToUpdateEventArgs, EventArgs } from "../../Events/EventArgs";

export class SliderView extends View {
    public sliderContainer: SliderContainer;
    public firstSlider: Handle;
    public lastSlider: Handle;
    public filledStrip: FilledStrip;
    public emptyStrip: EmptyStrip;

    public parts: SliderPart[] = new Array<SliderPart>();



    public onHandleMove: Event = new Event();

    constructor(mainContentContainer: HTMLElement) {
        super();

        this.parts.push(this.sliderContainer = new SliderContainer(this));
        this.sliderContainer.DOMElement = mainContentContainer;

        this.parts.push(this.emptyStrip = new EmptyStrip(this));
        this.parts.push(this.firstSlider = new Handle(this, 1));
        this.parts.push(this.lastSlider = new Handle(this, 2));
        this.parts.push(this.filledStrip = new FilledStrip(this));

        this._handlerMouseDown = this._handlerMouseDown.bind(this);
    }

    initialize() {
        this.update(true);
    }

    update(neededRerender: boolean) {
        let modelData = this.getModelData();

        if (neededRerender) {//полный перерендер всех элементов слайдера
            this.sliderContainer.DOMElement.innerHTML = "";
            this.parts.forEach(part => {
                if ((part === this.lastSlider && modelData.hasTwoSlider) || part !== this.lastSlider) {
                    part.buildDOMElement();
                    part.render();
                }
            });
        }
        else {//или просто обновление их состояний
            this.parts.forEach(part => {
                if ((part === this.lastSlider && modelData.hasTwoSlider) || part !== this.lastSlider) {
                    part.render();
                }
            });
        }
    }

    setHandlersOnHandls(handle: Handle) {
        handle.DOMElement.ondragstart = function () {
            return false;
        };
        handle.DOMElement.addEventListener("mousedown", this._handlerMouseDown);
        //handle.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
        handle.backgroundDOMElement.addEventListener("mousedown", (event: MouseEvent) => {
            this._handlerMouseDown(event);
        });
        /* handle.outsideDOMElement.addEventListener("touchstart", (event: MouseEvent) => {
            this._handlerMouseDown(event);
        }); */
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
        let targetSliderInstance: SliderPart;
        let targetHandleCountNumber: number;
        if (modelData.hasTwoSlider && sliderCountNumber === 2) {
            targetSliderInstance = this.lastSlider;
            targetHandleCountNumber = 2;
        }
        else if (modelData.hasTwoSlider && sliderCountNumber === 1) {
            targetSliderInstance = this.firstSlider;
            targetHandleCountNumber = 1;
        }
        else {
            targetSliderInstance = this.firstSlider;
            targetHandleCountNumber = 1;
        }
        if (!targetSliderInstance || targetHandleCountNumber === undefined) throw new Error("handle not exist");

        let targetSliderBoundingCoords = targetSliderInstance.DOMElement.getBoundingClientRect();
        let mousePositionInsideTargetSliderX = cursorMouseDownPosition.x - targetSliderBoundingCoords.x;
        let mousePositionInsideTargetSliderY = cursorMouseDownPosition.y - (document.documentElement.clientHeight + pageYOffset - targetSliderBoundingCoords.y - modelData.handleHeight);
        let mousePositionInsideTargetSlider = new Vector(mousePositionInsideTargetSliderX, mousePositionInsideTargetSliderY);


        let optionsForMouseEvents = {
            handlerMouseMove: (/* optionsFromMouseDown: IMouseEventArgs,  */event: MouseEvent): void => { },
            handlerMouseUp: (/* optionsFromMouseDown: IMouseEventArgs,  */event: MouseEvent): void => { },
            mousePositionInsideTargetSlider: mousePositionInsideTargetSlider,
            targetSliderInstance: <Handle>targetSliderInstance,
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

        if (!this.firstSlider) throw new Error("firstSliderInstance not exist");
        if (!this.sliderContainer) throw new Error("containerElementInstance not exist");

        let containerBoundingRect = this.sliderContainer.DOMElement.getBoundingClientRect();
        let containerCoord = new Vector(
            containerBoundingRect.x,
            (document.documentElement.clientHeight + pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height)
        );
        let cursorPositionInContainer = mouseGlobalPosition.subtract(containerCoord).subtract(mousePositionInsideTargetSlider);
        let containerCapacity;
        if (modelData.hasTwoSlider) {
            if (targetHandleCountNumber === 2) {
                let vectorizedHandleWidth = Vector.calculateVector(/* this.firstSlider.size.width */modelData.handleWidth, modelData.angleInRad);
                cursorPositionInContainer = cursorPositionInContainer.subtract(vectorizedHandleWidth);
            }
            containerCapacity = modelData.sliderStripLength - modelData.handleWidth/* this.firstSlider.size.width */ * 2;
        }
        else {
            containerCapacity = modelData.sliderStripLength - modelData.handleWidth/* this.firstSlider.size.width */;
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