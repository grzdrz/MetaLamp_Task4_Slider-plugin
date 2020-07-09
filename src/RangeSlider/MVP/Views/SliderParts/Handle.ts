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

        let handleSize = modelData.handleWidth;
        let dMaxMinValue = modelData.maxValue - modelData.minValue;

        let usedLength;
        if (modelData.hasTwoSlider)
            usedLength = modelData.sliderStripLength - handleSize * 2;
        else
            usedLength = modelData.sliderStripLength - handleSize;

        let handlePositionInContainer
        let value;
        if (this.countNumber === 1)
            value = modelData.firstValue;
        else
            value = modelData.lastValue;
        handlePositionInContainer = ((value - modelData.minValue) * usedLength) / dMaxMinValue;

        let vectorizedHandlePositionInContainer = Vector.calculateVector(handlePositionInContainer, modelData.angleInRad);
        if (this.countNumber === 2) {
            let vectorizedHandleSize = Vector.calculateVector(handleSize, modelData.angleInRad);
            vectorizedHandlePositionInContainer = vectorizedHandlePositionInContainer.sum(vectorizedHandleSize);
        }
        this.setPosition(vectorizedHandlePositionInContainer);

        this.renderBackground();
    }

    renderBackground() {///////////////////
        let modelData = this.view.getModelData();

        let backgroundPositionX = this.position.x - modelData.borderThickness;
        let backgroundPositionY = this.position.y - modelData.borderThickness;
        let position = new Vector(backgroundPositionX, backgroundPositionY);
        //let position = this.position.subtractNumber(modelData.borderThickness);

        let backgroundSizeX = modelData.borderThickness * 2 + modelData.handleWidth;
        let backgroundSizeY = modelData.borderThickness * 2 + modelData.handleHeight;
        let size = new Vector(backgroundSizeX, backgroundSizeY);
        //let size = this.size.sumNumber(modelData.borderThickness * 2);

        this.view.renderPosition(this.backgroundDOMElement, position);
        this.view.renderSize(this.backgroundDOMElement, size);
    }
}