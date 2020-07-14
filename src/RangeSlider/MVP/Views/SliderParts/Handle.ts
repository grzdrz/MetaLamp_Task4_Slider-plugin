import { SliderPart } from "./SliderPart";
import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export class Handle extends SliderPart {
    public countNumber: number;
    public backgroundDOMElement: HTMLElement;

    constructor(view: SliderView, countNumber: number) {
        super(view);

        this.backgroundDOMElement = document.createElement("div");//заглушка

        this.countNumber = countNumber;
    }

    initialize() {
        this.buildDOMElement();
        this.render();
    }


    buildDOMElement() {
        let modelData = this.view.getModelData();

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

    render() {
        let modelData = this.view.getModelData();

        let transformOriginX = modelData.handleWidth / 2;
        let transformOriginY = modelData.handleWidth / 2;
        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;//минус из-за нестандартного направления обхода функции rotate

        let value;
        if (this.countNumber === 1)
            value = modelData.firstValue;
        else
            value = modelData.lastValue;

        let handlePositionInContainer = this.view.calculateProportionalPixelValue(value);

        let vectorizedHandlePositionInContainer = Vector.calculateVector(handlePositionInContainer, modelData.angleInRad);
        if (this.countNumber === 2) {
            let vectorizedHandleSize = Vector.calculateVector(modelData.handleWidth, modelData.angleInRad);
            vectorizedHandlePositionInContainer = vectorizedHandlePositionInContainer.sum(vectorizedHandleSize);
        }
        this.setPosition(vectorizedHandlePositionInContainer);

        this.renderBackground(vectorizedHandlePositionInContainer);
    }

    renderBackground(position: Vector) {///////////////////
        let modelData = this.view.getModelData();

        let backgroundPositionX = position.x - modelData.borderThickness;
        let backgroundPositionY = position.y - modelData.borderThickness;
        let backgroundPosition = new Vector(backgroundPositionX, backgroundPositionY);

        let backgroundSizeX = modelData.borderThickness * 2 + modelData.handleWidth;
        let backgroundSizeY = modelData.borderThickness * 2 + modelData.handleHeight;
        let backgroundSize = new Vector(backgroundSizeX, backgroundSizeY);

        let transformOriginX = backgroundSizeX / 2;
        let transformOriginY = backgroundSizeY / 2;
        this.backgroundDOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.backgroundDOMElement.style.transform = `rotate(${-modelData.angle}deg)`;

        this.view.renderPosition(this.backgroundDOMElement, backgroundPosition);
        this.view.renderSize(this.backgroundDOMElement, backgroundSize);
    }
}