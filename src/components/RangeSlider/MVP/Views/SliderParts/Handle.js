import { SliderPart } from "./SliderPart.js";

export class Handle extends SliderPart {
    constructor(view, mainDOMElement, outsideDOMElement, countNumber) {
        super(view, mainDOMElement);

        this.countNumber = countNumber;
        this.outsideDOMElement = outsideDOMElement;

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    initialize() {
        let modelData = this.view.getModelData();
        this.outsideDOMElement.style.width = `${modelData.borderThickness * 2 + this.size.width}px`;
        this.outsideDOMElement.style.height = `${modelData.borderThickness * 2 + this.size.height}px`;

        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let sliderContainerLength = modelData.sliderStripLength;
        let handleSize = (modelData.orientation === "horizontal" ? this.size.width : this.size.height);
        let dMaxMinValue = modelData.maxValue - modelData.minValue;

        let usedLength;
        if (modelData.hasTwoSlider) {
            usedLength = sliderContainerLength - handleSize * 2;
        }
        else {
            usedLength = sliderContainerLength - handleSize;
        }

        let handlePositionInContainer
        let firstValue;
        if (modelData.firstValue > modelData.maxValue)
            firstValue = firstValue = modelData.maxValue;
        else if (modelData.firstValue < modelData.minValue)
            firstValue = modelData.minValue;
        else
            firstValue = modelData.firstValue;

        let lastValue = modelData.lastValue;
        if (modelData.lastValue > modelData.maxValue)
            lastValue = lastValue = modelData.maxValue;
        else if (modelData.lastValue < modelData.minValue)
            lastValue = modelData.minValue;
        else
            lastValue = modelData.lastValue;

        /* firstValue += modelData.minValue;
        lastValue += modelData.minValue; */

        if (this.countNumber === 1) {
            handlePositionInContainer = ((firstValue - modelData.minValue) * usedLength) / dMaxMinValue;
        }
        else {
            handlePositionInContainer = ((lastValue - modelData.minValue) * usedLength) / dMaxMinValue + handleSize;
        }
        let position = {
            x: (modelData.orientation === "horizontal" ? handlePositionInContainer : 0),
            y: (modelData.orientation === "vertical" ? handlePositionInContainer : 0),
        };
        this.setPosition(position);

        this.calculateBorderPosition();
    }

    calculateBorderPosition() {
        let modelData = this.view.getModelData();
        let position = {
            x: (modelData.orientation === "horizontal" ? this.position.x - modelData.borderThickness : 0),
            y: (modelData.orientation === "vertical" ? this.position.y - modelData.borderThickness : 0),
        };
        this.view.setPosition(this.outsideDOMElement, position);
    }
}