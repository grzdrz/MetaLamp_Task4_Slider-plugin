import SliderPart from "./SliderPart";
import SliderView from "../SliderView";
import Vector from "../../../../Helpers/Vector";
import OptionsToUpdateEventArgs from "../../../../Events/OptionsToUpdateEventArgs";
import IModelData from "../../../Model/IModelData";
import View from "../../View";

class Scale extends SliderPart {
    constructor(view: SliderView) {
        super(view);

        this.handlerClickOnSegment = this.handlerClickOnSegment.bind(this);
    }

    public initialize(): void {
        this.buildDOMElement();
        this.render();
    }

    public buildDOMElement(): void {
        super.buildDOMElement();

        this.DOMElement.className = "range-slider__scale-container";
        this.view.containerElement.append(this.DOMElement);

        this.buildSegments();
    }

    private buildSegments() {
        const modelData = this.view.getModelData();
        const { maxSegmentsCount, scaleFontSize } = this.view.viewManager.viewData;

        const segmentDensityLimit = this.calculateSegmentDensityLimit();

        let exactMaxSegmentsCount = maxSegmentsCount;
        if (maxSegmentsCount >= segmentDensityLimit) {
            exactMaxSegmentsCount = segmentDensityLimit;// для относительно больших сегментов
        }

        const stepsInOneSegment = Math.round(segmentDensityLimit / exactMaxSegmentsCount);

        for (let i = 0; i < exactMaxSegmentsCount; i += 1) {
            const segmentValue = i * modelData.stepSize * stepsInOneSegment + modelData.minValue;
            if (segmentValue >= modelData.maxValue) break;
            this.buildSegment(segmentValue, scaleFontSize);
        }
        this.buildSegment(modelData.maxValue, scaleFontSize);
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

        const segmentWidth = segment.getBoundingClientRect().width * Math.cos(angleInRad);
        const segmentHeight = scaleFontSize * Math.sin(angleInRad);
        const vectorizedSegmentLength = new Vector(segmentWidth, segmentHeight).length;

        let handlePositionInContainer = this.view.calculateProportionalPixelValue(value);
        if (modelData.hasTwoSlider) {
            handlePositionInContainer = handlePositionInContainer - vectorizedSegmentLength / 2 + handleWidth;
        } else {
            handlePositionInContainer = handlePositionInContainer - vectorizedSegmentLength / 2 + handleWidth / 2;
        }

        const marginFromSlider = 30;// отступ шкалы от полосы слайдера
        const vectorizedMargin = Vector.calculateVector(marginFromSlider, angleInRad);
        const rotatedMargin = vectorizedMargin.rotateVector(-Math.PI / 2);
        const vectorizedHandlePosition = Vector.calculateVector(handlePositionInContainer, angleInRad);
        const position = vectorizedHandlePosition.sum(rotatedMargin);

        View.renderPosition(segment, position);
    }

    private handlerClickOnSegment(event: MouseEvent) {
        event.preventDefault();

        const modelData = this.view.getModelData();

        const optionsToUpdate: IModelData = {};
        if (!event.currentTarget) throw new Error("some shit");
        const currentSegment = <HTMLElement>(event.currentTarget);
        if (!currentSegment.dataset.segmentValue) throw new Error("some shit2");
        const segmentValueString = currentSegment.dataset.segmentValue;
        const value = Number.parseFloat(segmentValueString);

        const values = modelData.values.map((e) => e);
        // определяет к какому ползунку ближе выбранный сегмент
        if (modelData.hasTwoSlider) {
            const dSegmentValueFirstValue = Math.abs(/* modelData.firstValue */values[0] - value);
            const dSegmentValueLastValue = Math.abs(/* modelData.lastValue */values[1] - value);
            if (dSegmentValueFirstValue < dSegmentValueLastValue) /* optionsToUpdate.firstValue */values[0] = value;
            else if (dSegmentValueFirstValue > dSegmentValueLastValue) /* optionsToUpdate.lastValue */values[1] = value;
            else {
                if (value < values[0]/* modelData.firstValue */) /* optionsToUpdate.firstValue */values[0] = value;
                else /* optionsToUpdate.lastValue */values[1] = value;
            }
        } else /* optionsToUpdate.firstValue */values[0] = value;


        this.view.onHandleMove.invoke(new OptionsToUpdateEventArgs({ values: values }/* optionsToUpdate */));
    }
}

export default Scale;
