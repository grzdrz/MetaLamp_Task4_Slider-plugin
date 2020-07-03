import { View } from "./View.js";

export class ScaleView extends View {
    constructor(scaleContainer) {
        super();

        // предельная плотность сегментов - сколько максимум сегментов можно вместить в максимальное значение шкалы,
        // если минимальный размер сегмента равен размеру шага.
        // т.е. п/п/с === максимальному числу шагов.
        this.segmentDensityLimit;

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

        this.segmentDensityLimit = this._calculateSegmentDensityLimit();

        let handleSize = (modelData.orientation === "horizontal" ? modelData.handleWidth : modelData.handleHeight);

        if (modelData.hasTwoSlider) {
            let scaleLength = modelData.sliderStripLength - handleSize / 2;
            if (modelData.orientation === "horizontal") {
                this.scaleContainer.style.width = `${scaleLength}px`;
                this.scaleContainer.style.height = "auto";
                this.scaleContainer.classList.remove("range-slider__scale-container_vertical");
                this.scaleContainer.classList.add("range-slider__scale-container_horizontal");
            }
            else if (modelData.orientation === "vertical") {
                this.scaleContainer.style.height = `${scaleLength}px`;
                this.scaleContainer.style.width = "auto";
                this.scaleContainer.classList.remove("range-slider__scale-container_horizontal");
                this.scaleContainer.classList.add("range-slider__scale-container_vertical");
            }
        }
        else {
            if (modelData.orientation === "horizontal") {
                this.scaleContainer.style.width = `${modelData.sliderStripLength}px`;
                this.scaleContainer.style.height = "auto";
                this.scaleContainer.classList.remove("range-slider__scale-container_vertical");
                this.scaleContainer.classList.add("range-slider__scale-container_horizontal");
            }
            else if (modelData.orientation === "vertical") {
                this.scaleContainer.style.height = `${modelData.sliderStripLength}px`;
                this.scaleContainer.style.width = "auto";
                this.scaleContainer.classList.remove("range-slider__scale-container_horizontal");
                this.scaleContainer.classList.add("range-slider__scale-container_vertical");
            }
        }

        //первый сегмент
        let firstSegment = document.createElement("div");
        firstSegment.className = "range-slider__scale-segment";
        let firstSegmentValue = modelData.minValue;
        firstSegment.textContent = firstSegmentValue.toFixed(4);
        firstSegment.dataset.segmentValue = firstSegmentValue;
        firstSegment.addEventListener("click", this._handlerSelectSegment);
        firstSegment.style.fontSize = `${modelData.scaleFontSize}px`;
        firstSegment.style.lineHeight = `${modelData.scaleFontSize}px`;
        this.scaleContainer.append(firstSegment);
        this._calculateSegmentPosition(firstSegment, firstSegmentValue);

        let maxSegmentsCount = this.maxSegmentsCount;
        if (maxSegmentsCount >= this.segmentDensityLimit)
            maxSegmentsCount = this.segmentDensityLimit;//для относительно больших сегментов
        let stepsInOneSegment = Math.round(this.segmentDensityLimit / maxSegmentsCount);
        for (let i = 1; i < maxSegmentsCount; i++) {
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
        if (modelData.hasTwoSlider) {
            if (modelData.orientation === "vertical")
                handlePositionInContainer = handlePositionInContainer + handleSize - modelData.scaleFontSize / 2;
            else {
                let segmentBR = segment.getBoundingClientRect();
                let segmentWidth = segmentBR.width;
                handlePositionInContainer = handlePositionInContainer + handleSize - segmentWidth / 2;
            }
        }
        else {
            if (modelData.orientation === "vertical")
                handlePositionInContainer = handlePositionInContainer - modelData.scaleFontSize / 2 + handleSize / 2;
            else {
                let segmentBR = segment.getBoundingClientRect();
                let segmentWidth = segmentBR.width;
                handlePositionInContainer = handlePositionInContainer - segmentWidth / 2 + handleSize / 2;
            }
        }
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