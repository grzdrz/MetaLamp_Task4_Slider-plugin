import SliderPart from "./SliderPart";
import Vector from "../../../../Helpers/Vector";
import View from "../../View";
import EventArgs from "../../../../Events/EventArgs";
import IModelData from "../../../Model/Data/IModelData";

class Scale extends SliderPart {
    public segments: HTMLElement[] = new Array<HTMLElement>();

    public build(): void {
        super.build();

        this.element.className = "range-slider__scale-container";
        this.view.containerElement.append(this.element);

        this.buildSegments();
    }

    public update(): void {
        this.segments.forEach((segment) => {
            const value = Number.parseFloat(<string>(segment.dataset.value));
            this.calculateSegmentPosition(segment, value);
        });
    }

    private buildSegments(): void {
        this.segments = [];
        const {
            stepSize,
            minValue,
            maxValue,
        } = this.view.viewManager.getModelData();
        const { maxSegmentsCount } = this.view.viewManager.data;

        const segmentDensityLimit = this.calculateSegmentDensityLimit();

        let exactMaxSegmentsCount = maxSegmentsCount;
        if (maxSegmentsCount >= segmentDensityLimit) {
            exactMaxSegmentsCount = segmentDensityLimit;// для относительно больших сегментов
        }

        const stepsInOneSegment = Math.round(segmentDensityLimit / exactMaxSegmentsCount);

        for (let i = 0; i < exactMaxSegmentsCount; i += 1) {
            const segmentValue = i * stepSize * stepsInOneSegment + minValue;
            if (segmentValue >= maxValue) break;
            this.buildSegment(segmentValue);
        }
        this.buildSegment(maxValue);
    }

    private buildSegment(segmentValue: number): void {
        const segment = document.createElement("div");
        this.segments.push(segment);
        this.element.append(segment);
        segment.className = "range-slider__scale-segment";
        const splitedValue = `${segmentValue}`.split(".");
        let value;
        if (splitedValue.length > 1) {
            value = `${splitedValue[0]}.${splitedValue[1].length > 6 ? Number.parseFloat(splitedValue[1]) : splitedValue[1]}`;
        } else value = `${splitedValue[0]}`;
        /* value.slice(0, 6); */
        segment.textContent = value/* .toFixed(4) */;// ////////
        segment.dataset.value = value;
        segment.addEventListener("click", this.handlerClickOnSegment);
        this.calculateSegmentPosition(segment, segmentValue);
    }

    private calculateSegmentDensityLimit(): number {
        const modelData = this.view.viewManager.getModelData();

        const dMaxMinValue = modelData.maxValue - modelData.minValue;
        const temp = dMaxMinValue / modelData.stepSize;
        return temp;
    }

    private calculateSegmentPosition(segment: HTMLElement, value: number): void {
        const modelData = this.view.viewManager.getModelData();
        const {
            angleInRad,
            handleWidth,
            isHandlesSeparated,
            scaleMargin,
        } = this.view.viewManager.data;

        const segmentRect = segment.getBoundingClientRect();
        const segmentWidth = segmentRect.width * Math.cos(angleInRad);
        const segmentHeight = segmentRect.height * Math.sin(angleInRad);
        const vectorizedSegmentLength = new Vector(segmentWidth, segmentHeight).length;

        let handlePositionInContainer = this.view.calculateProportionalPixelValue(value);
        const maxShiftCoefficient = (isHandlesSeparated ? modelData.values.length : 1);
        handlePositionInContainer = handlePositionInContainer - vectorizedSegmentLength / 2 + handleWidth * (maxShiftCoefficient / 2);

        const vectorizedMargin = Vector.calculateVector(scaleMargin, angleInRad);
        const rotatedMargin = vectorizedMargin.rotateVector(-Math.PI / 2);
        const vectorizedHandlePosition = Vector.calculateVector(handlePositionInContainer, angleInRad);
        const position = vectorizedHandlePosition.sum(rotatedMargin);

        View.renderPosition(segment, position);
    }

    private handlerClickOnSegment = (event: MouseEvent) => {
        event.preventDefault();

        const currentSegment = <HTMLElement>(event.currentTarget);
        const segmentValueString = <string>(currentSegment.dataset.value);
        const value = Number.parseFloat(segmentValueString);

        const values = this.view.findHandle(value);
        this.view.viewManager.onHandleMove.invoke(new EventArgs<IModelData>({ values }));
    };
}

export default Scale;
