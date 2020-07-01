import { View } from "./View.js";

export class ScaleView extends View {
    constructor(scaleContainer) {
        super();

        this.segmentsCount;

        this.scaleContainer = scaleContainer;

        this.onScaleSegmentClick = () => { };
        this._handlerSelectSegment = this._handlerSelectSegment.bind(this);
    }

    initialize() {
        this._render();
    }

    update(neededRerender) {
        //let data = this.getModelData();
        if (neededRerender) {
            this._render();
        }
    }

    _render() {
        let modelData = this.getModelData();

        this.scaleContainer.innerHTML = "";

        this.maxSegmentsCount = modelData.maxSegmentsCount;

        this.segmentsCount = this._calculateSegmentsCount();

        let handleSize = (modelData.orientation === "horizontal" ? modelData.handleWidth : modelData.handleHeight);

        if (modelData.hasTwoSlider) {
            let scaleLength = modelData.sliderStripLength - handleSize / 2;
            if (modelData.orientation === "horizontal") {
                this.scaleContainer.style.width = `${scaleLength}px`;
                this.scaleContainer.style.height = "auto";
                this.scaleContainer.style.marginLeft = `${handleSize / 2}px`;
                this.scaleContainer.classList.add("range-slider__scale-container_horizontal");
            }
            else if (modelData.orientation === "vertical") {
                this.scaleContainer.style.height = `${scaleLength}px`;
                this.scaleContainer.style.width = "auto";
                this.scaleContainer.style.marginBottom = `${handleSize / 2}px`;
                this.scaleContainer.classList.add("range-slider__scale-container_vertical");
            }
        }
        else {
            if (modelData.orientation === "horizontal") {
                this.scaleContainer.style.width = `${modelData.sliderStripLength}px`;
                this.scaleContainer.style.height = "auto";
                this.scaleContainer.classList.add("range-slider__scale-container_horizontal");
            }
            else if (modelData.orientation === "vertical") {
                this.scaleContainer.style.height = `${modelData.sliderStripLength}px`;
                this.scaleContainer.style.width = "auto";
                this.scaleContainer.classList.add("range-slider__scale-container_vertical");
            }
        }

        let stepsInSegment = Math.round(this.segmentsCount / this.maxSegmentsCount);
        for (let i = 0; i < this.maxSegmentsCount; i++) {
            let segment = document.createElement("div");
            segment.className = "range-slider__scale-segment";
            let segmentValue = i * modelData.stepSize * stepsInSegment;
            segment.textContent = segmentValue.toFixed(4);
            segment.dataset.segmentValue = segmentValue;
            segment.addEventListener("click", this._handlerSelectSegment);
            this._calculateSegmentPosition(segment, segmentValue);
            this.scaleContainer.append(segment);
        }
        //ластецкий сегмент
        let segment = document.createElement("div");
        segment.className = "range-slider__scale-segment";
        let segmentValue = modelData.maxValue;
        segment.textContent = segmentValue.toFixed(4);
        segment.dataset.segmentValue = segmentValue;
        segment.addEventListener("click", this._handlerSelectSegment);
        this._calculateSegmentPosition(segment, segmentValue);
        this.scaleContainer.append(segment);
    }

    _calculateSegmentsCount() {
        let maxValue = this.getModelData("maxValue");
        let minValue = this.getModelData("minValue");
        let stepSize = this.getModelData("stepSize");

        let dMaxMinValue = maxValue - minValue;
        let temp = dMaxMinValue / stepSize;
        return temp;
    }

    _calculateSegmentPosition(segment, value) {
        let modelData = this.getModelData();

        let sliderContainerLength = modelData.sliderStripLength;
        let handleSize = (modelData.orientation === "horizontal" ? modelData.handleWidth : modelData.handleHeight);
        let dMaxMinValue = modelData.maxValue - modelData.minValue;

        let usedLength;
        if (modelData.hasTwoSlider) {
            usedLength = sliderContainerLength - handleSize * 2;
        }
        else {
            usedLength = sliderContainerLength - handleSize;
        }

        let handlePositionInContainer = ((value - modelData.minValue) * usedLength) / dMaxMinValue;
        let position = {
            x: (modelData.orientation === "horizontal" ? handlePositionInContainer : 0),
            y: (modelData.orientation === "vertical" ? handlePositionInContainer : 0),
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