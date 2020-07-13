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
    public onModelStateUpdate: Event = new Event();

    constructor(mainContentContainer: HTMLElement) {
        super();

        this.parts.push(this.sliderContainer = new SliderContainer(this));
        this.sliderContainer.DOMElement = mainContentContainer;

        this.parts.push(this.emptyStrip = new EmptyStrip(this));
        this.parts.push(this.firstSlider = new Handle(this, 1));
        this.parts.push(this.lastSlider = new Handle(this, 2));
        this.parts.push(this.filledStrip = new FilledStrip(this));

        this._handlerMouseDown = this._handlerMouseDown.bind(this);
        this.handlerWindowSizeChange = this.handlerWindowSizeChange.bind(this);
    }

    initialize() {
        this.update(true);
        window.onresize = this.handlerWindowSizeChange;
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
        handle.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
        handle.backgroundDOMElement.addEventListener("mousedown", (event: UIEvent) => {
            this._handlerMouseDown(event);
        });
        handle.backgroundDOMElement.addEventListener("touchstart", (event: UIEvent) => {
            this._handlerMouseDown(event);
        });
    }

    //d&d
    _handlerMouseDown(event: UIEvent) {
        event.preventDefault();

        let modelData = this.getModelData();
        let cursorMouseDownPositionX;
        let cursorMouseDownPositionY;
        if (event instanceof TouchEvent) {
            let touchEvent = <TouchEvent>event;
            cursorMouseDownPositionX = touchEvent.changedTouches[0].pageX;
            cursorMouseDownPositionY = touchEvent.changedTouches[0].pageY
        }
        else {
            let mouseEvent = <MouseEvent>event;
            cursorMouseDownPositionX = mouseEvent.clientX;
            cursorMouseDownPositionY = mouseEvent.clientY;
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
            handlerMouseMove: (event: UIEvent): void => { },
            handlerMouseUp: (event: UIEvent): void => { },
            mousePositionInsideTargetSlider: mousePositionInsideTargetSlider,
            targetHandleCountNumber: targetHandleCountNumber,
        };
        let handlerMouseMove = this._handlerMouseMove.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseMove = handlerMouseMove;// чтобы обработчик mouseMove можно было отписать в mouseUp

        let handlerMouseUp = this._handlerMouseUp.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseUp = handlerMouseUp;// -//-

        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
        document.addEventListener("touchmove", handlerMouseMove);
        document.addEventListener("touchend", handlerMouseUp);
    }

    _handlerMouseMove(optionsFromMouseDown: IMouseEventArgs, event: UIEvent/* MouseEvent */) {
        let modelData = this.getModelData();
        let {
            mousePositionInsideTargetSlider,
            targetHandleCountNumber,
        } = optionsFromMouseDown;

        let mouseGlobalPositionX;
        let mouseGlobalPositionY;
        if (event instanceof TouchEvent) {
            let touchEvent = <TouchEvent>event;
            mouseGlobalPositionX = touchEvent.changedTouches[0].pageX;
            mouseGlobalPositionY = touchEvent.changedTouches[0].pageY
        }
        else {
            let mouseEvent = <MouseEvent>event;
            mouseGlobalPositionX = mouseEvent.clientX;
            mouseGlobalPositionY = mouseEvent.clientY;
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

    _handlerMouseUp(optionsFromMouseDown: IMouseEventArgs, event: UIEvent) {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
        document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp);
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
            containerCapacity = modelData.sliderStripLength - modelData.handleWidth * 2;
        }
        else {
            containerCapacity = modelData.sliderStripLength - modelData.handleWidth;
        }

        let mainAxisVector = Vector.calculateVector(modelData.sliderStripLength, modelData.angleInRad);
        let cursorPositionProjectionOnSliderMainAxis = cursorPositionInContainer.calculateVectorProjectionOnTargetVector(mainAxisVector);

        let proportionalValue = (modelData.deltaMaxMin * cursorPositionProjectionOnSliderMainAxis) / (containerCapacity) + modelData.minValue;
        if (targetHandleCountNumber === 1)
            this.onHandleMove.invoke(new OptionsToUpdateEventArgs({ firstValue: proportionalValue }));
        else
            this.onHandleMove.invoke(new OptionsToUpdateEventArgs({ lastValue: proportionalValue }));
    }

    handlerWindowSizeChange(event: UIEvent) {
        let modelData = this.getModelData();
        let target = <Window>(event.target);
        let windowWidth = document.documentElement.clientWidth;

        let currentSliderLengthNotEqualOriginalLength = modelData.sliderStripLength !== modelData.originalSliderStripLength;//чтоб уменьшить число ненужных перерендеров
        //let isWindowLongerThanSliderLength = /* window.pageXOffset === 0 || */ windowWidth > modelData.originalSliderStripLength;
        let isWindowLongerThanSliderLength = windowWidth > modelData.originalSliderStripLength/* this.sliderContainer.DOMElement.getBoundingClientRect().width */;
        if (!isWindowLongerThanSliderLength)
            this.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs({ sliderStripLength: windowWidth }));
        else if (isWindowLongerThanSliderLength && currentSliderLengthNotEqualOriginalLength) {
            this.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs({ sliderStripLength: modelData.originalSliderStripLength }));
        }
    }
}



interface IMouseEventArgs {
    handlerMouseMove: (/* optionsFromMouseDown: IMouseEventArgs,  */event: UIEvent) => void,
    handlerMouseUp: (/* optionsFromMouseDown: IMouseEventArgs,  */event: UIEvent) => void,
    mousePositionInsideTargetSlider: Vector,
    targetHandleCountNumber: number,
}

interface IValueToPixelArgs {
    modelData: Options,
    mouseGlobalPosition: Vector,
    mousePositionInsideTargetSlider: Vector,
    targetHandleCountNumber: number
}