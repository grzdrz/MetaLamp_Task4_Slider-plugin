import { View } from "./View.js";

export class ScaleView extends View {
    constructor(baseModelData, scaleContainer) {
        super();

        this.maxSegmentsCount = baseModelData.maxSegmentsCount;

        this.segmentsCount = this._calculateSegmentsCount(baseModelData);

        this.scaleContainer = scaleContainer;
        //scaleContainer.style.width = `${baseModelData.sliderStripLength - baseModelData.handleWidth}px`;
        //scaleContainer.style.marginLeft = `${baseModelData.handleWidth}px`;
        scaleContainer.style.width = `${baseModelData.sliderStripLength}px`;

        this.getModelData = () => { };
        //this.updateSliders = () => { };
    }

    initialize() {
        let modelData = this.getModelData();
        super.initialize(modelData);

        this.segments = [];
        let test1 = Math.round(this.segmentsCount / this.maxSegmentsCount);
        for (let i = 0; i < this.maxSegmentsCount; i++) {
            let segment = document.createElement("p");
            this.segments.push(segment);
            let value = i * modelData.stepSize * test1/* ((modelData.maxValue - modelData.minValue) / (this.segmentsCount)) */;
            segment.textContent = value.toFixed(4);
            this._calculatePosition(segment, value);
            segment.className = "range-slider__scale-segment";
            this.scaleContainer.append(segment);
        }

        //ластецкий
        let segment = document.createElement("p");
        this.segments.push(segment);
        let value = modelData.maxValue;
        segment.textContent = value.toFixed(4);
        this._calculatePosition(segment, value);
        segment.className = "range-slider__scale-segment";
        this.scaleContainer.append(segment);
    }

    _calculateSegmentsCount(modelData) {
        let dMaxMin = modelData.maxValue - modelData.minValue;
        let temp = dMaxMin / modelData.stepSize;
        /* if (temp <= 1) {
            return 2;
        }
        else if (temp > this.maxSegmentsCount) {
            return this.maxSegmentsCount;
        }
        else
            return temp; */
        return temp;
    }

    _calculatePosition(segment, value) {
        let modelData = this.getModelData();

        let slidersContainerSize;
        if (modelData.orientation === "horizontal")
            slidersContainerSize = modelData.sliderStripLength;
        else if (modelData.orientation === "vertical")
            slidersContainerSize = modelData.sliderStripLength;
        slidersContainerSize -= modelData.handleWidth;

        let dSliderInputFullValue = modelData.maxValue - modelData.minValue;

        let dSliderStripFullValue;
        if (modelData.orientation === "horizontal")
            dSliderStripFullValue = slidersContainerSize - modelData.handleWidth;
        else if (modelData.orientation === "vertical")
            dSliderStripFullValue = slidersContainerSize - modelData.handleHeight;


        let newTargetSliderPosInContainer;
        newTargetSliderPosInContainer = ((value - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue /* - modelData.handleWidth */;
        if (modelData.orientation === "horizontal")
            this.setPosition(segment, { x: newTargetSliderPosInContainer, y: 0 });
        else if (modelData.orientation === "vertical")
            this.setPosition(segment, { x: 0, y: newTargetSliderPosInContainer });
    }
}