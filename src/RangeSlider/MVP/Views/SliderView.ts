import View from "./View";

import SliderPart from "./SliderParts/SliderPart";
import SliderContainer from "./SliderParts/SliderContainer";
import Handle from "./SliderParts/Handle";
import FilledStrip from "./SliderParts/FilledStrip";
import EmptyStrip from "./SliderParts/EmptyStrip";

import Vector from "../../Helpers/Vector";

import Event from "../../Events/Event";
import OptionsToUpdateEventArgs from "../../Events/OptionsToUpdateEventArgs";
import Scale from "./SliderParts/Scale";
import ViewManager from "./ViewManager";

class SliderView extends View {
    public sliderContainer: SliderContainer;

    public firstSlider: Handle;

    public lastSlider: Handle;

    public filledStrip: FilledStrip;

    public emptyStrip: EmptyStrip;

    public scale: Scale;

    public parts: SliderPart[] = new Array<SliderPart>();

    public onHandleMove: Event = new Event();

    public onModelStateUpdate: Event = new Event();

    constructor(containerElement: HTMLElement, viewManager: ViewManager) {
        super(containerElement, viewManager);

        this.parts.push(this.sliderContainer = new SliderContainer(this));
        this.sliderContainer.DOMElement = containerElement;

        this.parts.push(this.emptyStrip = new EmptyStrip(this));
        this.parts.push(this.firstSlider = new Handle(this, 1));
        this.parts.push(this.lastSlider = new Handle(this, 2));
        this.parts.push(this.filledStrip = new FilledStrip(this));
        this.parts.push(this.scale = new Scale(this));

        this.handlerMouseDown = this.handlerMouseDown.bind(this);

        this.handlerViewportSizeChange = this.handlerViewportSizeChange.bind(this);
    }

    public initialize(): void {
        this.parts.forEach((part) => {
            part.initialize();
        });
        window.addEventListener("resize", this.handlerViewportSizeChange);
    }

    public update(neededRerender: boolean): void {
        const modelData = this.getModelData();

        if (neededRerender) { // полный перерендер всех элементов слайдера
            this.sliderContainer.DOMElement.innerHTML = "";
            this.parts.forEach((part) => {
                if ((part === this.lastSlider && modelData.hasTwoSlider) || part !== this.lastSlider) {
                    part.buildDOMElement();
                    part.render();
                }
            });
        } else { // или просто обновление их состояний
            this.parts.forEach((part) => {
                if ((part === this.lastSlider && modelData.hasTwoSlider) || part !== this.lastSlider) {
                    part.render();
                }
            });
        }
    }

    public setHandlersOnHandls(handleInstance: Handle): void {
        const handle = handleInstance;
        handle.DOMElement.ondragstart = () => false;
        handle.DOMElement.addEventListener("mousedown", this.handlerMouseDown);
        handle.DOMElement.addEventListener("touchstart", this.handlerMouseDown);
        handle.backgroundDOMElement.addEventListener("mousedown", (event: UIEvent) => {
            this.handlerMouseDown(event);
        });
        handle.backgroundDOMElement.addEventListener("touchstart", (event: UIEvent) => {
            this.handlerMouseDown(event);
        });
    }

    // d&d
    private handlerMouseDown(event: UIEvent) {
        event.preventDefault();

        const modelData = this.getModelData();
        const { handleHeight } = this.viewManager.viewData;

        let cursorMouseDownPositionX;
        let cursorMouseDownPositionY;
        if (event instanceof TouchEvent) {
            const touchEvent = /* <TouchEvent> */event;
            cursorMouseDownPositionX = touchEvent.changedTouches[0].pageX;
            cursorMouseDownPositionY = touchEvent.changedTouches[0].pageY;
        } else {
            const mouseEvent = <MouseEvent>event;
            cursorMouseDownPositionX = mouseEvent.clientX;
            cursorMouseDownPositionY = mouseEvent.clientY;
        }
        cursorMouseDownPositionY = (document.documentElement.clientHeight + window.pageYOffset) - cursorMouseDownPositionY;
        // cursorMouseDownPositionX =;
        const cursorMouseDownPosition = new Vector(cursorMouseDownPositionX, cursorMouseDownPositionY);// место нажатия левой кнопки мыши

        let sliderCountNumber = 0;
        if (event.currentTarget !== null) { // //////////////////
            const sliderCountNumberString = (<HTMLElement>event.currentTarget).dataset.sliderCountNumber;
            if (sliderCountNumberString !== undefined) {
                sliderCountNumber = Number.parseInt(sliderCountNumberString, 10);
            }
        }
        let targetSliderInstance: SliderPart;
        let targetHandleCountNumber: number;
        if (modelData.hasTwoSlider && sliderCountNumber === 2) {
            targetSliderInstance = this.lastSlider;
            targetHandleCountNumber = 2;
        } else if (modelData.hasTwoSlider && sliderCountNumber === 1) {
            targetSliderInstance = this.firstSlider;
            targetHandleCountNumber = 1;
        } else {
            targetSliderInstance = this.firstSlider;
            targetHandleCountNumber = 1;
        }
        if (!targetSliderInstance || targetHandleCountNumber === undefined) throw new Error("handle not exist");

        const targetSliderBoundingCoords = targetSliderInstance.DOMElement.getBoundingClientRect();
        const mousePositionInsideTargetSliderX = cursorMouseDownPosition.x - targetSliderBoundingCoords.x;
        const mousePositionInsideTargetSliderY = cursorMouseDownPosition.y - (document.documentElement.clientHeight + window.pageYOffset - targetSliderBoundingCoords.y - /* modelData. */handleHeight);
        const mousePositionInsideTargetSlider = new Vector(mousePositionInsideTargetSliderX, mousePositionInsideTargetSliderY);

        const optionsForMouseEvents = {
            handlerMouseMove: (_event: UIEvent): void => { },
            handlerMouseUp: (_event: UIEvent): void => { },
            mousePositionInsideTargetSlider,
            targetHandleCountNumber,
        };
        const handlerMouseMove = this.handlerMouseMove.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseMove = handlerMouseMove;// чтобы обработчик mouseMove можно было отписать в mouseUp

        const handlerMouseUp = this.handlerMouseUp.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseUp = handlerMouseUp;// -//-

        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
        document.addEventListener("touchmove", handlerMouseMove);
        document.addEventListener("touchend", handlerMouseUp);
    }

    private handlerMouseMove(optionsFromMouseDown: IMouseEventArgs, event: UIEvent) {
        const {
            mousePositionInsideTargetSlider,
            targetHandleCountNumber,
        } = optionsFromMouseDown;

        let mouseGlobalPositionX;
        let mouseGlobalPositionY;
        if (event instanceof TouchEvent) {
            const touchEvent = /* <TouchEvent> */event;
            mouseGlobalPositionX = touchEvent.changedTouches[0].pageX;
            mouseGlobalPositionY = touchEvent.changedTouches[0].pageY;
        } else {
            const mouseEvent = <MouseEvent>event;
            mouseGlobalPositionX = mouseEvent.clientX;
            mouseGlobalPositionY = mouseEvent.clientY;
        }
        mouseGlobalPositionY = (document.documentElement.clientHeight + window.pageYOffset) - mouseGlobalPositionY;
        // mouseGlobalPositionX =;
        const mouseGlobalPosition = new Vector(mouseGlobalPositionX, mouseGlobalPositionY);// место нажатия левой кнопки мыши
        const cursorPositionInContainer = this.calculateCursorPositionInContainer(mouseGlobalPosition, mousePositionInsideTargetSlider);

        this.calculateProportionalValue(cursorPositionInContainer, targetHandleCountNumber);
    }

    private handlerMouseUp(optionsFromMouseDown: IMouseEventArgs, _event: UIEvent) {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
        document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp);
    }

    private calculateCursorPositionInContainer(mouseGlobalPosition: Vector, mousePositionInsideTargetSlider: Vector) {
        const containerBoundingRect = this.sliderContainer.DOMElement.getBoundingClientRect();
        const containerCoord = new Vector(
            containerBoundingRect.x,
            (document.documentElement.clientHeight + window.pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height),
        );

        return mouseGlobalPosition.subtract(containerCoord).subtract(mousePositionInsideTargetSlider);
    }

    // значение в условных единицах пропорциональное пиксельным координатам курсора в контейнере
    public calculateProportionalValue(cursorPositionInContainer: Vector, handleCountNumber: number): void {
        const modelData = this.getModelData();
        const { handleWidth, angleInRad } = this.viewManager.viewData;

        let containerCapacity;
        if (modelData.hasTwoSlider) {
            if (handleCountNumber === 2) {
                const vectorizedHandleWidth = Vector.calculateVector(handleWidth, angleInRad);
                cursorPositionInContainer = cursorPositionInContainer.subtract(vectorizedHandleWidth);
            }
            containerCapacity = this.sliderContainer.sliderLength - handleWidth * 2;
        } else {
            containerCapacity = this.sliderContainer.sliderLength - handleWidth;
        }

        const mainAxisVector = Vector.calculateVector(this.sliderContainer.sliderLength, angleInRad);
        const cursorPositionProjectionOnSliderMainAxis = cursorPositionInContainer.calculateVectorProjectionOnTargetVector(mainAxisVector);

        const proportionalValue = (modelData.deltaMaxMin * cursorPositionProjectionOnSliderMainAxis) / (containerCapacity) + modelData.minValue;

        if (handleCountNumber === 1) {
            this.onHandleMove.invoke(new OptionsToUpdateEventArgs({ firstValue: proportionalValue }));
        } else {
            this.onHandleMove.invoke(new OptionsToUpdateEventArgs({ lastValue: proportionalValue }));
        }
    }

    // пиксельное значение пропорциональное условному значению
    public calculateProportionalPixelValue(value: number): number {
        const modelData = this.getModelData();

        const { sliderLength } = this.sliderContainer;
        const { handleWidth } = /* modelData.handleWidth */this.viewManager.viewData;
        let usedLength;
        if (modelData.hasTwoSlider) {
            usedLength = sliderLength - handleWidth * 2;
        } else {
            usedLength = sliderLength - handleWidth;
        }

        return ((value - modelData.minValue) * usedLength) / modelData.deltaMaxMin;
    }

    private handlerViewportSizeChange(_event: UIEvent) {
        this.update(/* false */true);
    }
}

export default SliderView;

interface IMouseEventArgs {
    handlerMouseMove: (event: UIEvent) => void,
    handlerMouseUp: (event: UIEvent) => void,
    mousePositionInsideTargetSlider: Vector,
    targetHandleCountNumber: number,
}
