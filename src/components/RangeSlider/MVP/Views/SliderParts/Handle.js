import { SliderPart } from "./SliderPart.js";
import { Vector } from "../../../Helpers/Vector.js";

export class Handle extends SliderPart {
    constructor(view, mainDOMElement, outsideDOMElement, countNumber) {
        super(view, mainDOMElement);

        this.countNumber = countNumber;

        this.outsideDOMElement = outsideDOMElement;
        this.outsidePosition = new Vector(0, 0);
        this.outsideSize = new Vector(0, 0);

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let sliderContainerLength = modelData.sliderStripLength;
        let handleSize = this.size.width;
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


        if (this.countNumber === 1) {
            handlePositionInContainer = ((firstValue - modelData.minValue) * usedLength) / dMaxMinValue;
        }
        else {
            handlePositionInContainer = ((lastValue - modelData.minValue) * usedLength) / dMaxMinValue + handleSize;
        }

        let radFromDeg = modelData.angle * (Math.PI / 180);
        let position = {
            x: handlePositionInContainer * Math.cos(radFromDeg),
            y: handlePositionInContainer * Math.sin(radFromDeg),
        };
        this.setPosition(position);

        this.calculateBorder();
    }

    calculateBorder() {
        let modelData = this.view.getModelData();

        this.outsidePosition.x = this.position.x - modelData.borderThickness;
        this.outsidePosition.y = this.position.y - modelData.borderThickness;

        this.outsideSize.x = modelData.borderThickness * 2 + this.size.width;
        this.outsideSize.y = modelData.borderThickness * 2 + this.size.height;

        this.view.setPosition(this.outsideDOMElement, this.outsidePosition);
        this.view.setSize(this.outsideDOMElement, this.outsideSize);
    }
}