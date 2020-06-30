import { View } from "./View.js";

export class ScaleView extends View {
    constructor(baseModelData, scaleContainer) {
        super();

        this.maxSegmentsCount = baseModelData.maxSegmentsCount;

        this.segmentsCount = this._calculateSegmentsCount(baseModelData);

        this.scaleContainer = scaleContainer;
        scaleContainer.style.width = `${baseModelData.sliderStripLength}px`;

        this.getModelData = () => { };
        //this.updateSliders = () => { };
    }

    initialize() {
        let modelData = this.getModelData();
        super.initialize(modelData);

        this.segments = [];
        for (let i = 0; i < this.segmentsCount; i++) {
            let segment = document.createElement("p");
            this.segments.push(segment);
            let value = i * ((modelData.maxValue - modelData.minValue) / this.segmentsCount);
            segment.textContent = value.toFixed(2);
            this._calculatePosition(segment, value);
            //this.setPosition(segment, position);
            segment.className = "range-slider__scale-segment";
            this.scaleContainer.append(segment);
        }

        //ластецкий
        let segment = document.createElement("p");
        this.segments.push(segment);
        let value = modelData.maxValue;
        segment.textContent = value.toFixed(2);
        this._calculatePosition(segment, value);
        //this.setPosition(segment, position);
        segment.className = "range-slider__scale-segment";
        this.scaleContainer.append(segment);
    }

    _calculateSegmentsCount(modelData) {
        let dMaxMin = modelData.maxValue - modelData.minValue;
        let temp = dMaxMin / modelData.stepSize;
        if (temp <= 1) {
            return 2;
        }
        else if (temp > this.maxSegmentsCount) {
            return this.maxSegmentsCount;
        }
        else
            return temp;
    }

    _calculatePosition(segment, value) {
        let modelData = this.getModelData();

        let slidersContainerSize;
        if (modelData.orientation === "horizontal")
            slidersContainerSize = /* this.slidersContainerInstance.size.width */modelData.sliderStripLength;
        else if (modelData.orientation === "vertical")
            slidersContainerSize = /* this.slidersContainerInstance.size.height */modelData.sliderStripLength;

        let dSliderInputFullValue = modelData.maxValue - modelData.minValue;

        let dSliderStripFullValue;
        if (modelData.orientation === "horizontal")
            dSliderStripFullValue = slidersContainerSize - /* this.size.width */modelData.handleWidth;
        else if (modelData.orientation === "vertical")
            dSliderStripFullValue = slidersContainerSize - /* this.size.height */modelData.handleHeight;


        let newTargetSliderPosInContainer;
        newTargetSliderPosInContainer = ((value - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue;
        if (modelData.orientation === "horizontal")
            this.setPosition(segment, { x: newTargetSliderPosInContainer, y: 0 });
        else if (modelData.orientation === "vertical")
            this.setPosition(segment, { x: 0, y: newTargetSliderPosInContainer });
    }
}