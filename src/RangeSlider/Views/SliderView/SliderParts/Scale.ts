import EventArgs from '../../../Events/EventArgs';
import ModelData from '../../../Data/ModelData';
import MathFunctions from '../../../Helpers/MathFunctions';
import Vector from '../../../Helpers/Vector';
import View from '../../View';
import SliderPart from './SliderPart';

class Scale extends SliderPart {
  public segments: HTMLElement[] = new Array<HTMLElement>();

  public build(modelData: ModelData): void {
    super.build(modelData);

    this.element.className = 'range-slider__scale-container';
    this.view.containerElement.append(this.element);

    this.buildSegments(modelData);
  }

  public update(modelData: ModelData): void {
    this.segments.forEach((segment) => {
      const value = Number.parseFloat(<string>(segment.dataset.value));
      this.calculateSegmentPosition(modelData, segment, value);
    });
  }

  private buildSegments(modelData: ModelData): void {
    this.segments = [];
    const {
      stepSize,
      minValue,
      maxValue,
    } = modelData;
    const { maxSegmentsCount } = this.view.viewManager.data;

    const segmentDensityLimit = this.calculateSegmentDensityLimit(modelData);

    let exactMaxSegmentsCount = maxSegmentsCount;
    if (maxSegmentsCount >= segmentDensityLimit) {
      exactMaxSegmentsCount = segmentDensityLimit;
    }
    const stepsInOneSegment = Math.round(segmentDensityLimit / exactMaxSegmentsCount);

    for (let i = 0; i < exactMaxSegmentsCount; i += 1) {
      const segmentValue = i * stepSize * stepsInOneSegment + minValue;
      if (segmentValue >= maxValue) break;
      this.buildSegment(modelData, segmentValue);
    }
    this.buildSegment(modelData, maxValue);
  }

  private buildSegment(modelData: ModelData, segmentValue: number): void {
    const { stepSize } = modelData;

    const segment = document.createElement('div');
    segment.className = 'range-slider__scale-segment';

    const value = MathFunctions.cutOffJunkValuesFromFraction(segmentValue, stepSize);
    segment.textContent = `${value}`;
    segment.dataset.value = `${value}`;

    segment.addEventListener('click', this.handleSegmentClick);
    this.calculateSegmentPosition(modelData, segment, segmentValue);

    this.segments.push(segment);
    this.element.append(segment);
  }

  private calculateSegmentDensityLimit(modelData: ModelData): number {
    const { deltaMaxMin, stepSize } = modelData;

    const density = deltaMaxMin / stepSize;
    return density;
  }

  private calculateSegmentPosition(modelData: ModelData, segment: HTMLElement, value: number): void {
    const { values } = modelData;
    const {
      angleInRadians,
      handleWidth,
      isHandlesSeparated,
      scaleMargin,
    } = this.view.viewManager.data;

    const segmentRect = segment.getBoundingClientRect();
    const segmentWidth = segmentRect.width * Math.cos(angleInRadians);
    const segmentHeight = segmentRect.height * Math.sin(angleInRadians);
    const vectorizedSegmentLength = new Vector(segmentWidth, segmentHeight).length;

    let handlePositionInContainer = this.view.calculateProportionalPixelValue(modelData, value);
    const maxShiftCoefficient = (isHandlesSeparated ? values.length : 1);
    handlePositionInContainer = handlePositionInContainer - vectorizedSegmentLength / 2 + handleWidth * (maxShiftCoefficient / 2);

    const vectorizedMargin = Vector.calculateVector(scaleMargin, angleInRadians);
    const rotatedMargin = vectorizedMargin.rotateVector(-Math.PI / 2);
    const vectorizedHandlePosition = Vector.calculateVector(handlePositionInContainer, angleInRadians);
    const position = vectorizedHandlePosition.sum(rotatedMargin);

    View.renderPosition(segment, position);
  }

  private handleSegmentClick = (event: MouseEvent) => {
    const currentSegment = <HTMLElement>(event.currentTarget);
    const segmentValueString = <string>(currentSegment.dataset.value);
    const value = Number.parseFloat(segmentValueString);

    this.view.viewManager.onScaleClick.invoke(new EventArgs<number>(value));
  };
}

export default Scale;
