import EventArgs from '../../../Events/EventArgs';
import IModelData from '../../../Data/IModelData';
import MathFunctions from '../../../Helpers/MathFunctions';
import Vector from '../../../Helpers/Vector';
import View from '../../View';
import SliderPart from './SliderPart';

class Scale extends SliderPart {
  public segments: HTMLElement[] = new Array<HTMLElement>();

  public build(): void {
    super.build();

    this.element.className = 'range-slider__scale-container';
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
    this.view.viewManager.onExtractModelData.invoke();
    const {
      stepSize,
      minValue,
      maxValue,
    } = this.view.viewManager.modelData;
    const { maxSegmentsCount } = this.view.viewManager.data;

    const segmentDensityLimit = this.calculateSegmentDensityLimit();

    let exactMaxSegmentsCount = maxSegmentsCount;
    if (maxSegmentsCount >= segmentDensityLimit) {
      exactMaxSegmentsCount = segmentDensityLimit;
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
    this.view.viewManager.onExtractModelData.invoke();
    const { stepSize } = this.view.viewManager.modelData;

    const segment = document.createElement('div');
    segment.className = 'range-slider__scale-segment';

    const value = MathFunctions.cutOffJunkValuesFromFraction(segmentValue, stepSize);
    segment.textContent = `${value}`;
    segment.dataset.value = `${value}`;

    segment.addEventListener('click', this.handleSegmentClick);
    this.calculateSegmentPosition(segment, segmentValue);

    this.segments.push(segment);
    this.element.append(segment);
  }

  private calculateSegmentDensityLimit(): number {
    this.view.viewManager.onExtractModelData.invoke();
    const { deltaMaxMin, stepSize } = this.view.viewManager.modelData;

    const density = deltaMaxMin / stepSize;
    return density;
  }

  private calculateSegmentPosition(segment: HTMLElement, value: number): void {
    this.view.viewManager.onExtractModelData.invoke();
    const { values } = this.view.viewManager.modelData;
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

    let handlePositionInContainer = this.view.calculateProportionalPixelValue(value);
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

    const values = this.view.setClosestHandle(value);
    this.view.viewManager.onHandleMove.invoke(new EventArgs<IModelData>({ values }));
  };
}

export default Scale;