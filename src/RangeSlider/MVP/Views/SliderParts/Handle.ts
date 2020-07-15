import SliderPart from "./SliderPart";
import Vector from "../../../Helpers/Vector";
import SliderView from "../SliderView";
import View from "../View";

class Handle extends SliderPart {
    public countNumber: number;

    public backgroundDOMElement: HTMLElement;

    constructor(view: SliderView, countNumber: number) {
        super(view);

        this.backgroundDOMElement = document.createElement("div");// заглушка
        this.countNumber = countNumber;
    }

    public initialize(): void {
        this.buildDOMElement();
        this.render();
    }

    public buildDOMElement(): void {
        const { handleWidth, handleHeight } = this.view.viewManager.viewData;

        this.DOMElement = document.createElement("div");
        this.DOMElement.className = `range-slider__${(this.countNumber === 1 ? "first" : "last")}-slider`;
        this.DOMElement.dataset.sliderCountNumber = this.countNumber.toString();
        this.DOMElement.style.width = `${handleWidth}px`;
        this.DOMElement.style.height = `${handleHeight}px`;
        this.view.sliderContainer.DOMElement.append(this.DOMElement);

        this.backgroundDOMElement = document.createElement("div");
        this.backgroundDOMElement.className = `range-slider__${(this.countNumber === 1 ? "first" : "last")}-slider-outside`;
        this.backgroundDOMElement.dataset.sliderCountNumber = this.countNumber.toString();
        this.view.sliderContainer.DOMElement.append(this.backgroundDOMElement);

        this.view.setHandlersOnHandls(this);
    }

    public render(): void {
        const modelData = this.view.getModelData();
        const { handleWidth, angle, angleInRad } = this.view.viewManager.viewData;

        const transformOriginX = handleWidth / 2;
        const transformOriginY = handleWidth / 2;
        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-angle}deg)`;// минус из-за нестандартного направления обхода функции rotate

        let value;
        if (this.countNumber === 1) value = modelData.firstValue;
        else value = modelData.lastValue;

        const handlePositionInContainer = this.view.calculateProportionalPixelValue(value);

        let vectorizedHandlePositionInContainer = Vector.calculateVector(handlePositionInContainer, angleInRad);
        if (this.countNumber === 2) {
            const vectorizedHandleSize = Vector.calculateVector(handleWidth, angleInRad);
            vectorizedHandlePositionInContainer = vectorizedHandlePositionInContainer.sum(vectorizedHandleSize);
        }
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
}

export default Handle;
