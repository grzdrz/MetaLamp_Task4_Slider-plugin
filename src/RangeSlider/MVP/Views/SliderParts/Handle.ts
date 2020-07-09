import { SliderPart } from "./SliderPart";
import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export class Handle extends SliderPart {
    public countNumber: number;
    public outsideDOMElement: HTMLElement;
    public outsidePosition: Vector;
    public outsideSize: Vector;

    constructor(view: SliderView, mainDOMElement: HTMLElement, outsideDOMElement: HTMLElement, countNumber: number) {
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
            handlePositionInContainer = ((lastValue - modelData.minValue) * usedLength) / dMaxMinValue;
        }

        let newX = handlePositionInContainer * Math.cos(modelData.angleInRad);
        let newY = handlePositionInContainer * Math.sin(modelData.angleInRad);
        if (this.countNumber === 2) {
            newX += handleSize * Math.cos(modelData.angleInRad);
            newY += handleSize * Math.sin(modelData.angleInRad);
        }
        this.setPosition(new Vector(newX, newY));

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