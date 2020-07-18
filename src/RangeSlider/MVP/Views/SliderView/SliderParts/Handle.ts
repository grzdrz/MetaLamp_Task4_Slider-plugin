import SliderPart from "./SliderPart";
import Vector from "../../../../Helpers/Vector";
import SliderView from "../SliderView";
import View from "../../View";

interface IMouseEventArgs {
    handlerMouseMove: (event: UIEvent) => void,
    handlerMouseUp: (event: UIEvent) => void,
    mousePositionInsideTargetSlider: Vector,
}

class Handle extends SliderPart {
    public countNumber: number;

    public backgroundDOMElement: HTMLElement;

    constructor(view: SliderView, countNumber: number) {
        super(view);

        this.backgroundDOMElement = document.createElement("div");
        this.countNumber = countNumber;

        this.handlerMouseDown = this.handlerMouseDown.bind(this);
    }

    public initialize(): void {
        this.buildDOMElement();
        this.render();
    }

    public buildDOMElement(): void {
        super.buildDOMElement();

        const { handleWidth, handleHeight } = this.view.viewManager.viewData;

        this.DOMElement.className = `range-slider__${(this.countNumber === 1 ? "first" : "last")}-slider`;
        this.DOMElement.dataset.sliderCountNumber = this.countNumber.toString();
        this.DOMElement.style.width = `${handleWidth}px`;
        this.DOMElement.style.height = `${handleHeight}px`;
        this.view.containerElement.append(this.DOMElement);

        this.backgroundDOMElement.innerHTML = "";
        this.backgroundDOMElement.className = `range-slider__${(this.countNumber === 1 ? "first" : "last")}-slider-outside`;
        this.backgroundDOMElement.dataset.sliderCountNumber = this.countNumber.toString();
        this.view.containerElement.append(this.backgroundDOMElement);

        this.setDragAndDropHandlers();
    }

    public setDragAndDropHandlers(): void {
        this.DOMElement.ondragstart = () => false;
        this.DOMElement.addEventListener("mousedown", this.handlerMouseDown);
        this.DOMElement.addEventListener("touchstart", this.handlerMouseDown);
        this.backgroundDOMElement.addEventListener("mousedown", (event: UIEvent) => {
            this.handlerMouseDown(event);
        });
        this.backgroundDOMElement.addEventListener("touchstart", (event: UIEvent) => {
            this.handlerMouseDown(event);
        });
    }

    public render(): void {
        const modelData = this.view.getModelData();
        const { handleWidth, angle, angleInRad } = this.view.viewManager.viewData;

        const transformOriginX = handleWidth / 2;
        const transformOriginY = handleWidth / 2;
        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-angle}deg)`;// минус из-за нестандартного направления обхода функции rotate

        const values = modelData.values.map((e) => e);
        const value = values[this.countNumber];

        const handlePositionInContainer = this.view.calculateProportionalPixelValue(value);

        let vectorizedHandlePositionInContainer = Vector.calculateVector(handlePositionInContainer, angleInRad);
        const vectorizedHandleSize = Vector.calculateVector(handleWidth * this.countNumber, angleInRad);
        vectorizedHandlePositionInContainer = vectorizedHandlePositionInContainer.sum(vectorizedHandleSize);

        this.setPosition(vectorizedHandlePositionInContainer);

        this.renderBackground(vectorizedHandlePositionInContainer);
    }

    renderBackground(position: Vector): void {
        const {
            handleWidth,
            handleHeight,
            angle,
            borderThickness,
        } = this.view.viewManager.viewData;

        const backgroundPositionX = position.x - borderThickness;
        const backgroundPositionY = position.y - borderThickness;
        const backgroundPosition = new Vector(backgroundPositionX, backgroundPositionY);

        const backgroundSizeX = borderThickness * 2 + handleWidth;
        const backgroundSizeY = borderThickness * 2 + handleHeight;
        const backgroundSize = new Vector(backgroundSizeX, backgroundSizeY);

        const transformOriginX = backgroundSizeX / 2;
        const transformOriginY = backgroundSizeY / 2;
        this.backgroundDOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.backgroundDOMElement.style.transform = `rotate(${-angle}deg)`;

        View.renderPosition(this.backgroundDOMElement, backgroundPosition);
        View.renderSize(this.backgroundDOMElement, backgroundSize);
    }

    // d&d
    private handlerMouseDown(event: UIEvent) {
        event.preventDefault();

        const { handleHeight } = this.view.viewManager.viewData;

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

        const targetSliderBoundingCoords = this.DOMElement.getBoundingClientRect();
        const mousePositionInsideTargetSliderX = cursorMouseDownPosition.x - targetSliderBoundingCoords.x;
        const mousePositionInsideTargetSliderY = cursorMouseDownPosition.y - (document.documentElement.clientHeight + window.pageYOffset - targetSliderBoundingCoords.y - /* modelData. */handleHeight);
        const mousePositionInsideTargetSlider = new Vector(mousePositionInsideTargetSliderX, mousePositionInsideTargetSliderY);

        const optionsForMouseEvents = {
            handlerMouseMove: (_event: UIEvent): void => { },
            handlerMouseUp: (_event: UIEvent): void => { },
            mousePositionInsideTargetSlider,
        };
        const handlerMouseMove = this.handlerMouseMove.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseMove = handlerMouseMove;

        const handlerMouseUp = this.handlerMouseUp.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseUp = handlerMouseUp;// чтобы обработчик mouseMove можно было отписать

        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
        document.addEventListener("touchmove", handlerMouseMove);
        document.addEventListener("touchend", handlerMouseUp);
    }

    private handlerMouseMove(optionsFromMouseDown: IMouseEventArgs, event: UIEvent) {
        const {
            mousePositionInsideTargetSlider,
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

        this.view.calculateProportionalValue(cursorPositionInContainer, this.countNumber);
    }

    private handlerMouseUp(optionsFromMouseDown: IMouseEventArgs, _event: UIEvent) {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
        document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp);
    }

    private calculateCursorPositionInContainer(mouseGlobalPosition: Vector, mousePositionInsideTargetSlider: Vector) {
        const containerBoundingRect = this.view.containerElement.getBoundingClientRect();
        const containerCoord = new Vector(
            containerBoundingRect.x,
            (document.documentElement.clientHeight + window.pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height),
        );

        return mouseGlobalPosition.subtract(containerCoord).subtract(mousePositionInsideTargetSlider);
    }
}

export default Handle;
