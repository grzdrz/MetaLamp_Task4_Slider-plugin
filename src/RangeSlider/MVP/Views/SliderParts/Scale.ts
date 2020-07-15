import SliderPart from "./SliderPart";
import SliderView from "../SliderView";
import Vector from "../../../Helpers/Vector";
import OptionsToUpdateEventArgs from "../../../Events/OptionsToUpdateEventArgs";
import IOptions from "../../Model/IOptions";
import View from "../View";

class Scale extends SliderPart {
    // public maxSegmentsCount = 0;

    constructor(view: SliderView) {
        super(view);

        this.handlerClickOnSegment = this.handlerClickOnSegment.bind(this);
    }

    public initialize(): void {
        this.buildDOMElement();
        this.render();
    }

    public buildDOMElement(): void {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "range-slider__scale-container";
        this.view.sliderContainer.DOMElement.append(this.DOMElement);

        this.buildSegments();
    }

    private buildSegments() {
        const modelData = this.view.getModelData();
        const { maxSegmentsCount, scaleFontSize } = this.view.viewManager.viewData;

        // this.maxSegmentsCount = modelData.maxSegmentsCount;

        const segmentDensityLimit = this.calculateSegmentDensityLimit();

        /* let { maxSegmentsCount } = this; */
        let exactMaxSegmentsCount = maxSegmentsCount;
        if (maxSegmentsCount >= segmentDensityLimit) {
            exactMaxSegmentsCount = segmentDensityLimit;// для относительно больших сегментов
        }

        const stepsInOneSegment = Math.round(segmentDensityLimit / exactMaxSegmentsCount);

        for (let i = 0; i < exactMaxSegmentsCount; i += 1) {
            const segmentValue = i * modelData.stepSize * stepsInOneSegment + modelData.minValue;
            if (segmentValue >= modelData.maxValue) break;
            this.buildSegment(segmentValue, /* modelData. */scaleFontSize);
        }
        this.buildSegment(modelData.maxValue, /* modelData. */scaleFontSize);
    }

    private buildSegment(segmentValue: number, fontSize: number) {
        const segment = document.createElement("div");
        this.DOMElement.append(segment);
        segment.className = "range-slider__scale-segment";
        segment.textContent = segmentValue.toFixed(4);// ////////
        segment.dataset.segmentValue = segmentValue.toString();
        segment.addEventListener("click", this.handlerClickOnSegment);
        segment.style.fontSize = `${fontSize}px`;
        segment.style.lineHeight = `${fontSize}px`;
        this.calculateSegmentPosition(segment, segmentValue);
    }

    public render(): void {
        // this.buildDOMElement();
    }

    private calculateSegmentDensityLimit() {
        const modelData = this.view.getModelData();

        const dMaxMinValue = modelData.maxValue - modelData.minValue;
        const temp = dMaxMinValue / modelData.stepSize;
        return temp;
    }

    private calculateSegmentPosition(segment: HTMLElement, value: number) {
        const modelData = this.view.getModelData();
        const { angleInRad, scaleFontSize, handleWidth } = this.view.viewManager.viewData;

        const segmentWidth = segment.getBoundingClientRect().width * Math.cos(/* modelData. */angleInRad);
        const segmentHeight = /* modelData. */scaleFontSize * Math.sin(/* modelData. */angleInRad);
        const vectorizedSegmentLength = new Vector(segmentWidth, segmentHeight).length;

        let handlePositionInContainer = this.view.calculateProportionalPixelValue(value);
        if (modelData.hasTwoSlider) {
            handlePositionInContainer = handlePositionInContainer - vectorizedSegmentLength / 2 + /* modelData. */handleWidth;
        } else {
            handlePositionInContainer = handlePositionInContainer - vectorizedSegmentLength / 2 + /* modelData. */handleWidth / 2;
        }

        const marginFromSlider = 30;// отступ шкалы от полосы слайдера
        const vectorizedMargin = Vector.calculateVector(marginFromSlider, /* modelData. */angleInRad);
        const rotatedMargin = vectorizedMargin.rotateVector(-Math.PI / 2);
        const vectorizedHandlePosition = Vector.calculateVector(handlePositionInContainer, /* modelData. */angleInRad);
        const position = vectorizedHandlePosition.sum(rotatedMargin);

        View.renderPosition(segment, position);
    }

    private handlerClickOnSegment(event: MouseEvent) {
        event.preventDefault();

        const modelData = this.view.getModelData();

        const optionsToUpdate: IOptions = {};
        if (!event.currentTarget) throw new Error("some shit");
        const currentSegment = <HTMLElement>(event.currentTarget);
        if (!currentSegment.dataset.segmentValue) throw new Error("some shit2");
        const segmentValueString = currentSegment.dataset.segmentValue;
        const value = Number.parseFloat(segmentValueString);

        // определяет к какому ползунку ближе выбранный сегмент
        if (modelData.hasTwoSlider) {
            const dSegmentValueFirstValue = Math.abs(modelData.firstValue - value);
            const dSegmentValueLastValue = Math.abs(modelData.lastValue - value);
            if (dSegmentValueFirstValue < dSegmentValueLastValue) optionsToUpdate.firstValue = value;
            else if (dSegmentValueFirstValue > dSegmentValueLastValue) optionsToUpdate.lastValue = value;
            else {
                if (value < modelData.firstValue) optionsToUpdate.firstValue = value;
                else optionsToUpdate.lastValue = value;
            }
        } else optionsToUpdate.firstValue = value;

        this.view.onHandleMove.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}

export default Scale;
