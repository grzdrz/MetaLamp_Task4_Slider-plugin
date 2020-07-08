import { View } from "./View";
import { Vector } from "../../Helpers/Vector";
import { IOptions } from "../Model/Options";
import { Event } from "../../Events/Event";
import { OptionsToUpdateEventArgs, EventArgs } from "../../Events/EventArgs";

export class ScaleView extends View {
    public containerElement: HTMLElement;
    public maxSegmentsCount: number = 0;

    public onScaleSegmentClick: Event = new Event;

    constructor(scaleContainer: HTMLElement) {
        super();

        this.containerElement = scaleContainer;

        //this.onScaleSegmentClick = () => { };
        this._handlerSelectSegment = this._handlerSelectSegment.bind(this);
    }

    initialize() {
        this._render();
    }

    update(neededRerender: boolean) {
        if (neededRerender) {
            this._render();
        }
    }

    _render() {
        let modelData = this.getModelData();

        this.containerElement.innerHTML = "";

        this.maxSegmentsCount = modelData.maxSegmentsCount;

        let segmentDensityLimit = this._calculateSegmentDensityLimit();

        let maxSegmentsCount = this.maxSegmentsCount;
        if (maxSegmentsCount >= segmentDensityLimit)
            maxSegmentsCount = segmentDensityLimit;//для относительно больших сегментов
        let stepsInOneSegment = Math.round(segmentDensityLimit / maxSegmentsCount);
        for (let i = 0; i < maxSegmentsCount; i++) {
            let segment = document.createElement("div");
            segment.className = "range-slider__scale-segment";
            let segmentValue = i * modelData.stepSize * stepsInOneSegment + modelData.minValue;
            if (segmentValue >= modelData.maxValue) break;

            segment.textContent = segmentValue.toFixed(4);
            segment.dataset.segmentValue = segmentValue.toString();
            segment.addEventListener("click", this._handlerSelectSegment);
            segment.style.fontSize = `${modelData.scaleFontSize}px`;
            segment.style.lineHeight = `${modelData.scaleFontSize}px`;
            this.containerElement.append(segment);

            this._calculateSegmentPosition(segment, segmentValue);
        }
        //ластецкий сегмент
        let lastSegment = document.createElement("div");
        lastSegment.className = "range-slider__scale-segment";
        let lastSegmentValue = modelData.maxValue;
        lastSegment.textContent = lastSegmentValue.toFixed(4);
        lastSegment.dataset.segmentValue = lastSegmentValue.toString();
        lastSegment.addEventListener("click", this._handlerSelectSegment);
        lastSegment.style.fontSize = `${modelData.scaleFontSize}px`;
        lastSegment.style.lineHeight = `${modelData.scaleFontSize}px`;
        this.containerElement.append(lastSegment);

        this._calculateSegmentPosition(lastSegment, lastSegmentValue);
    }

    _calculateSegmentDensityLimit() {
        /* let maxValue: number = this.getModelData("maxValue");
        let minValue: number = this.getModelData("minValue");
        let stepSize = this.getModelData("stepSize"); */
        let modelData = this.getModelData();

        let dMaxMinValue = modelData.maxValue - modelData.minValue;
        let temp = dMaxMinValue / modelData.stepSize;
        return temp;
    }

    _calculateSegmentPosition(segment: HTMLElement, value: number) {
        let modelData = this.getModelData();

        let sliderContainerLength = modelData.sliderStripLength;
        let handleSize = modelData.handleWidth;
        let dMaxMinValue = modelData.maxValue - modelData.minValue;

        let usedLength;
        if (modelData.hasTwoSlider) {
            usedLength = sliderContainerLength - handleSize * 2;
        }
        else {
            usedLength = sliderContainerLength - handleSize;
        }

        let segmentBR = segment.getBoundingClientRect();
        let segmentWidth = segmentBR.width;
        let segmentSizeVector = new Vector(segmentWidth, modelData.scaleFontSize);
        segmentSizeVector.x = segmentSizeVector.x * Math.cos(modelData.angleInRad);
        segmentSizeVector.y = segmentSizeVector.y * Math.sin(modelData.angleInRad);
        let segmentSizeVectorLength = segmentSizeVector.length;
        let handlePositionInContainer = ((value - modelData.minValue) * usedLength) / dMaxMinValue;
        if (modelData.hasTwoSlider) {
            handlePositionInContainer = handlePositionInContainer + handleSize - segmentSizeVectorLength / 2;
        }
        else {
            handlePositionInContainer = handlePositionInContainer - segmentSizeVectorLength / 2 + handleSize / 2;
        }

        let testMargin = new Vector(30, 30);
        testMargin.x = testMargin.x * Math.cos(modelData.angleInRad);
        testMargin.y = testMargin.y * Math.sin(modelData.angleInRad);
        /* let position = {
            x: handlePositionInContainer * Math.cos(modelData.angleInRad) + testMargin.y,
            y: handlePositionInContainer * Math.sin(modelData.angleInRad) - testMargin.x,
        }; */
        let x = handlePositionInContainer * Math.cos(modelData.angleInRad) + testMargin.y;
        let y = handlePositionInContainer * Math.sin(modelData.angleInRad) - testMargin.x;
        let position = new Vector(x, y);
        this.setPosition(segment, position);
    }

    _handlerSelectSegment(event: MouseEvent) {
        event.preventDefault();

        let modelData = this.getModelData();

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

        //this.onScaleSegmentClick(optionsToUpdate);
        this.onScaleSegmentClick.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}