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
        const modelData = this.view.getModelData();

        this.DOMElement = document.createElement("div");
        this.DOMElement.className = `range-slider__${(this.countNumber === 1 ? "first" : "last")}-slider`;
        this.DOMElement.dataset.sliderCountNumber = this.countNumber.toString();
        this.DOMElement.style.width = `${modelData.handleWidth}px`;
        this.DOMElement.style.height = `${modelData.handleHeight}px`;
        this.view.sliderContainer.DOMElement.append(this.DOMElement);

        this.backgroundDOMElement = document.createElement("div");
        this.backgroundDOMElement.className = `range-slider__${(this.countNumber === 1 ? "first" : "last")}-slider-outside`;
        this.backgroundDOMElement.dataset.sliderCountNumber = this.countNumber.toString();
        this.view.sliderContainer.DOMElement.append(this.backgroundDOMElement);

        this.view.setHandlersOnHandls(this);
    }

    public render(): void {
        const modelData = this.view.getModelData();

        const transformOriginX = modelData.handleWidth / 2;
        const transformOriginY = modelData.handleWidth / 2;
        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;// минус из-за нестандартного направления обхода функции rotate

        let value;
        if (this.countNumber === 1) value = modelData.firstValue;
        else value = modelData.lastValue;

        const handlePositionInContainer = this.view.calculateProportionalPixelValue(value);

        let vectorizedHandlePositionInContainer = Vector.calculateVector(handlePositionInContainer, modelData.angleInRad);
        if (this.countNumber === 2) {
            const vectorizedHandleSize = Vector.calculateVector(modelData.handleWidth, modelData.angleInRad);
            vectorizedHandlePositionInContainer = vectorizedHandlePositionInContainer.sum(vectorizedHandleSize);
        }
        this.setPosition(vectorizedHandlePositionInContainer);

        this.renderBackground(vectorizedHandlePositionInContainer);
    }

    renderBackground(position: Vector): void { // /////////////////
        const modelData = this.view.getModelData();

        const backgroundPositionX = position.x - modelData.borderThickness;
        const backgroundPositionY = position.y - modelData.borderThickness;
        const backgroundPosition = new Vector(backgroundPositionX, backgroundPositionY);

        const backgroundSizeX = modelData.borderThickness * 2 + modelData.handleWidth;
        const backgroundSizeY = modelData.borderThickness * 2 + modelData.handleHeight;
        const backgroundSize = new Vector(backgroundSizeX, backgroundSizeY);

        const transformOriginX = backgroundSizeX / 2;
        const transformOriginY = backgroundSizeY / 2;
        this.backgroundDOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.backgroundDOMElement.style.transform = `rotate(${-modelData.angle}deg)`;

        View.renderPosition(this.backgroundDOMElement, backgroundPosition);
        View.renderSize(this.backgroundDOMElement, backgroundSize);
    }
}

export default Handle;
