import SliderPart from "./SliderPart";
import SliderView from "../SliderView";
import Vector from "../../../Helpers/Vector";
import OptionsToUpdateEventArgs from "../../../Events/OptionsToUpdateEventArgs";
import IOptions from "../../Model/IOptions";
import View from "../View";

class Scale extends SliderPart {
    public maxSegmentsCount: number = 0;

    constructor(view: SliderView) {
        super(view);

        this.handlerClickOnSegment = this.handlerClickOnSegment.bind(this);
    }


    initialize() {
        this.buildDOMElement();
        this.render();
    }


    buildDOMElement() {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "range-slider__scale-container";
        this.view.sliderContainer.DOMElement.append(this.DOMElement);

        this.buildSegments();
    }

    buildSegments() {
        let modelData = this.view.getModelData();

        this.maxSegmentsCount = modelData.maxSegmentsCount;

        let segmentDensityLimit = this.calculateSegmentDensityLimit();

        let maxSegmentsCount = this.maxSegmentsCount;
        if (maxSegmentsCount >= segmentDensityLimit)
            maxSegmentsCount = segmentDensityLimit;//для относительно больших сегментов

        let stepsInOneSegment = Math.round(segmentDensityLimit / maxSegmentsCount);

        for (let i = 0; i < maxSegmentsCount; i++) {
            let segmentValue = i * modelData.stepSize * stepsInOneSegment + modelData.minValue;
            if (segmentValue >= modelData.maxValue) break;
            this.buildSegment(segmentValue, modelData.scaleFontSize);
        }
        this.buildSegment(modelData.maxValue, modelData.scaleFontSize);
    }

    buildSegment(segmentValue: number, fontSize: number) {
        let segment = document.createElement("div");
        this.DOMElement.append(segment);
        segment.className = "range-slider__scale-segment";
        segment.textContent = segmentValue.toFixed(4);//////////
        segment.dataset.segmentValue = segmentValue.toString();
        segment.addEventListener("click", this.handlerClickOnSegment);
        segment.style.fontSize = `${fontSize}px`;
        segment.style.lineHeight = `${fontSize}px`;
        this.calculateSegmentPosition(segment, segmentValue);
    }

    render() {
        //this.buildDOMElement();
    }

    private calculateSegmentDensityLimit() {
        let modelData = this.view.getModelData();

        let dMaxMinValue = modelData.maxValue - modelData.minValue;
        let temp = dMaxMinValue / modelData.stepSize;
        return temp;
    }

    private calculateSegmentPosition(segment: HTMLElement, value: number) {
        let modelData = this.view.getModelData();

        let segmentWidth = segment.getBoundingClientRect().width * Math.cos(modelData.angleInRad);
        let segmentHeight = modelData.scaleFontSize * Math.sin(modelData.angleInRad);
        let vectorizedSegmentLength = new Vector(segmentWidth, segmentHeight).length;

        let handlePositionInContainer = this.view.calculateProportionalPixelValue(value);
        if (modelData.hasTwoSlider) {
            handlePositionInContainer = handlePositionInContainer - vectorizedSegmentLength / 2 + modelData.handleWidth;
        }
        else {
            handlePositionInContainer = handlePositionInContainer - vectorizedSegmentLength / 2 + modelData.handleWidth / 2;
        }

        let marginFromSlider = 30;//отступ шкалы от полосы слайдера
        let vectorizedMargin = Vector.calculateVector(marginFromSlider, modelData.angleInRad);
        let rotatedMargin = vectorizedMargin.rotateVector(-Math.PI / 2);
        let vectorizedHandlePosition = Vector.calculateVector(handlePositionInContainer, modelData.angleInRad);
        let position = vectorizedHandlePosition.sum(rotatedMargin);

        View.renderPosition(segment, position);
    }

    private handlerClickOnSegment(event: MouseEvent) {
        event.preventDefault();

        let modelData = this.view.getModelData();

        let optionsToUpdate: IOptions = {};
        if (!event.currentTarget)
            throw new Error("some shit");
        let currentSegment = <HTMLElement>(event.currentTarget);
        if (!currentSegment.dataset.segmentValue)
            throw new Error("some shit2");
        let segmentValueString = currentSegment.dataset.segmentValue;
        let value = Number.parseFloat(segmentValueString);

        //определяет к какому ползунку ближе выбранный сегмент
        if (modelData.hasTwoSlider) {
            let dSegmentValueFirstValue = Math.abs(modelData.firstValue - value);
            let dSegmentValueLastValue = Math.abs(modelData.lastValue - value);
            if (dSegmentValueFirstValue < dSegmentValueLastValue)
                optionsToUpdate.firstValue = value;
            else if (dSegmentValueFirstValue > dSegmentValueLastValue)
                optionsToUpdate.lastValue = value;
            else {
                if (value < modelData.firstValue)
                    optionsToUpdate.firstValue = value;
                else
                    optionsToUpdate.lastValue = value;
            }
        }
        else
            optionsToUpdate.firstValue = value;

        this.view.onHandleMove.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}

export default Scale;
