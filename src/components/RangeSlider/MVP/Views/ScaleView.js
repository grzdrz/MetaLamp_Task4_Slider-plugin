import { View } from "./View.js";
import { Vector } from "../../Helpers/Vector.js";

export class ScaleView extends View {
    constructor(scaleContainer) {
        super();

        this.scaleContainer = scaleContainer;

        this.onScaleSegmentClick = () => { };
        this._handlerSelectSegment = this._handlerSelectSegment.bind(this);
    }

    initialize() {
        this._render();
    }

    update(neededRerender) {
        if (neededRerender) {
            this._render();
        }
    }

    _render() {
        let modelData = this.getModelData();

        this.scaleContainer.innerHTML = "";

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
            segment.dataset.segmentValue = segmentValue;
            segment.addEventListener("click", this._handlerSelectSegment);
            segment.style.fontSize = `${modelData.scaleFontSize}px`;
            segment.style.lineHeight = `${modelData.scaleFontSize}px`;
            this.scaleContainer.append(segment);

            this._calculateSegmentPosition(segment, segmentValue);
        }
        //ластецкий сегмент
        let lastSegment = document.createElement("div");
        lastSegment.className = "range-slider__scale-segment";
        let lastSegmentValue = modelData.maxValue;
        lastSegment.textContent = lastSegmentValue.toFixed(4);
        lastSegment.dataset.segmentValue = lastSegmentValue;
        lastSegment.addEventListener("click", this._handlerSelectSegment);
        lastSegment.style.fontSize = `${modelData.scaleFontSize}px`;
        lastSegment.style.lineHeight = `${modelData.scaleFontSize}px`;
        this.scaleContainer.append(lastSegment);

        this._calculateSegmentPosition(lastSegment, lastSegmentValue);
    }

    _calculateSegmentDensityLimit() {
        let maxValue = this.getModelData("maxValue");
        let minValue = this.getModelData("minValue");
        let stepSize = this.getModelData("stepSize");

        let dMaxMinValue = maxValue - minValue;
        let temp = dMaxMinValue / stepSize;
        return temp;
    }

    _calculateSegmentPosition(segment, value) {
        let modelData = this.getModelData();
        let radFromDeg = modelData.angle * (Math.PI / 180);

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
        segmentSizeVector.x = segmentSizeVector.x * Math.cos(radFromDeg);
        segmentSizeVector.y = segmentSizeVector.y * Math.sin(radFromDeg);
        let segmentSizeVectorLength = segmentSizeVector.length;
        let handlePositionInContainer = ((value - modelData.minValue) * usedLength) / dMaxMinValue;
        if (modelData.hasTwoSlider) {
            handlePositionInContainer = handlePositionInContainer + handleSize - segmentSizeVectorLength / 2;
        }
        else {
            handlePositionInContainer = handlePositionInContainer - segmentSizeVectorLength / 2 + handleSize / 2;
        }

        let testMargin = new Vector(30, 30);
        testMargin.x = testMargin.x * Math.cos(radFromDeg); 
        testMargin.y = testMargin.y * Math.sin(radFromDeg); 
        let position = {
            x: handlePositionInContainer * Math.cos(radFromDeg) + testMargin.y,
            y: handlePositionInContainer * Math.sin(radFromDeg) - testMargin.x,
        };
        this.setPosition(segment, position);
    }

    _handlerSelectSegment(event) {
        event.preventDefault();

        let modelData = this.getModelData();

        let optionsToUpdate = {};
        let currentSegment = event.currentTarget;
        let value = Number.parseFloat(currentSegment.dataset.segmentValue);

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

        this.onScaleSegmentClick(optionsToUpdate);
    }
}