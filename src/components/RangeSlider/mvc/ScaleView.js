import { View } from "./View.js";

export class ScaleView extends View {
    constructor(baseModelData, scaleContainer) {
        super();

        this.maxSegmentsCount = baseModelData.maxSegmentsCount;

        this.segmentsCount = this._calculateSegmentsCount(baseModelData);

        this.scaleContainer = scaleContainer;
        if (baseModelData.hasTwoSlider) {
            if (baseModelData.orientation === "horizontal") {
                scaleContainer.style.width = `${baseModelData.sliderStripLength - baseModelData.handleWidth / 2}px`;
                scaleContainer.style.marginLeft = `${baseModelData.handleWidth / 2}px`;
                scaleContainer.classList.add("range-slider__scale-container_horizontal");
            }
            else if (baseModelData.orientation === "vertical") {
                /* scaleContainer.style.height = `${baseModelData.sliderStripLength}px`; */
                scaleContainer.style.height = `${baseModelData.sliderStripLength - baseModelData.handleHeight / 2}px`;
                scaleContainer.style.marginBottom = `${baseModelData.handleHeight / 2}px`;
                scaleContainer.classList.add("range-slider__scale-container_vertical");
            }
        }
        else {
            if (baseModelData.orientation === "horizontal") {
                scaleContainer.style.width = `${baseModelData.sliderStripLength/*  - baseModelData.handleWidth / 2 */}px`;
                //scaleContainer.style.marginLeft = `${baseModelData.handleWidth / 2}px`;
                scaleContainer.classList.add("range-slider__scale-container_horizontal");
            }
            else if (baseModelData.orientation === "vertical") {
                /* scaleContainer.style.height = `${baseModelData.sliderStripLength}px`; */
                scaleContainer.style.height = `${baseModelData.sliderStripLength/*  - baseModelData.handleHeight / 2 */}px`;
                //scaleContainer.style.marginBottom = `${baseModelData.handleHeight / 2}px`;
                scaleContainer.classList.add("range-slider__scale-container_vertical");
            }
        }



        this.segments = [];

        this.getModelData = () => { };
        this.onScaleSegmentClick = () => { };
        this._handlerSelectValue = this._handlerSelectValue.bind(this);
    }

    initialize() {
        let modelData = this.getModelData();
        super.initialize(modelData);

        let stepsInSegment = Math.round(this.segmentsCount / this.maxSegmentsCount);
        for (let i = 0; i < this.maxSegmentsCount; i++) {
            let segment = document.createElement("div");
            this.segments.push(segment);
            let value = i * modelData.stepSize * stepsInSegment/* ((modelData.maxValue - modelData.minValue) / (this.segmentsCount)) */;
            segment.textContent = value.toFixed(4);
            segment.dataset.segmentValue = value;

            segment.className = "range-slider__scale-segment";
            this.scaleContainer.append(segment);

            segment.addEventListener("click", this._handlerSelectValue);

            this._calculatePosition(segment, value);
        }

        //ластецкий
        let segment = document.createElement("div");
        this.segments.push(segment);
        let value = modelData.maxValue;
        segment.textContent = value.toFixed(4);
        segment.dataset.segmentValue = value;

        segment.className = "range-slider__scale-segment";
        this.scaleContainer.append(segment);

        segment.addEventListener("click", this._handlerSelectValue);

        this._calculatePosition(segment, value);
    }

    update(){
        let data = this.getModelData();

        //...
    }

    _calculateSegmentsCount(modelData) {
        let dMaxMin = modelData.maxValue - modelData.minValue;
        let temp = dMaxMin / modelData.stepSize;
        return temp;
    }

    _calculatePosition(segment, value) {
        let modelData = this.getModelData();

        /* let slidersContainerSize;
        slidersContainerSize = modelData.sliderStripLength - modelData.handleWidth; */

        let dSliderInputFullValue = modelData.maxValue - modelData.minValue;

        let dSliderStripFullValue;
        if (modelData.hasTwoSlider) {
            if (modelData.orientation === "horizontal")
                dSliderStripFullValue = modelData.sliderStripLength - modelData.handleWidth * 2;
            else if (modelData.orientation === "vertical")
                dSliderStripFullValue = modelData.sliderStripLength - modelData.handleHeight * 2;
        }
        else {
            if (modelData.orientation === "horizontal")
                dSliderStripFullValue = modelData.sliderStripLength - modelData.handleWidth;
            else if (modelData.orientation === "vertical")
                dSliderStripFullValue = modelData.sliderStripLength - modelData.handleHeight;
        }


        let newTargetSliderPosInContainer;
        newTargetSliderPosInContainer = ((value - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue /* - modelData.handleWidth */;
        if (modelData.orientation === "horizontal")
            this.setPosition(segment, { x: newTargetSliderPosInContainer, y: 0 });
        else if (modelData.orientation === "vertical")
            this.setPosition(segment, { x: 0, y: newTargetSliderPosInContainer });
    }

    _handlerSelectValue(event) {
        event.preventDefault();

        let modelData = this.getModelData();

        let optionsToUpdate = {};
        let currentSegment = event.currentTarget;
        let value = Number.parseFloat(currentSegment.dataset.segmentValue);

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