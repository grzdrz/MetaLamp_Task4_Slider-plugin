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
        segment.textContent = segmentValue.toFixed(4);// ////////
        segment.dataset.value = `${segmentValue}`;
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

        const modelData = this.view.viewManager.getModelData();

        const currentSegment = <HTMLElement>(event.currentTarget);
        const segmentValueString = <string>(currentSegment.dataset.value);
        const value = Number.parseFloat(segmentValueString);

        const { values } = modelData;
        // определяет к какому ползунку ближе выбранный сегмент
        // список приращений всех значений к выбранному и их индексы
        const deltaValues = values.map((e, index) => ({ index, dValue: Math.abs(e - value) }));
        // отсеиваем самые маленькие приращения, т.е. элементы которых были ближе всех к выбранному сегменту
        const sortedDeltaValues = deltaValues.sort((a, b) => a.dValue - b.dValue);
        const smallestDeltaValues = sortedDeltaValues.filter((e) => e.dValue === sortedDeltaValues[0].dValue);
        const smallestValues = smallestDeltaValues.map((e) => ({ index: e.index, value: values[e.index] }));
        const suitableValue = smallestValues[0].value;
        // выбираем какое значение из отсеяных нужно сдвинуть(нужно для случаев когда есть несколько ближайших одинаковых значений)
        if (value > suitableValue) {
            const indexOfSuitableValue = smallestValues.length - 1;
            values[smallestValues[indexOfSuitableValue].index] = value;
        } else if (value < suitableValue) {
            const indexOfSuitableValue = 0;
            values[smallestValues[indexOfSuitableValue].index] = value;
        }

        this.view.viewManager.onHandleMove.invoke(new EventArgs<IModelData>({ values }));
    };
}

export default Scale;
