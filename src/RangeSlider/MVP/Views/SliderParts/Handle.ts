import { SliderPart } from "./SliderPart";
import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export class Handle extends SliderPart {
    public countNumber: number;
    public backgroundDOMElement: HTMLElement;
    public backgroundPosition: Vector;
    public backgroundSize: Vector;

    constructor(view: SliderView, mainDOMElement: HTMLElement, backgroundDOMElement: HTMLElement, countNumber: number) {
        super(view, mainDOMElement);

        this.countNumber = countNumber;

        this.backgroundDOMElement = backgroundDOMElement;
        this.backgroundPosition = new Vector(0, 0);
        this.backgroundSize = new Vector(0, 0);
    }

    initialize() {
        this.render();
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

    renderBackground() {
        let modelData = this.view.getModelData();

        this.backgroundPosition.x = this.position.x - modelData.borderThickness;
        this.backgroundPosition.y = this.position.y - modelData.borderThickness;

        this.backgroundSize.x = modelData.borderThickness * 2 + this.size.width;
        this.backgroundSize.y = modelData.borderThickness * 2 + this.size.height;

        this.view.renderPosition(this.backgroundDOMElement, this.backgroundPosition);
        this.view.renderSize(this.backgroundDOMElement, this.backgroundSize);
    }
}