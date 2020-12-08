import Vector from '../../../Helpers/Vector';
import SliderView from '../SliderView';
import SliderPart from './SliderPart';

class Tooltip extends SliderPart {
  public segments: HTMLElement[] = new Array<HTMLElement>();
  public countNumber: number;

  constructor(view: SliderView, countNumber: number) {
    super(view);
    this.countNumber = countNumber;
  }

  public build(): void {
    super.build();

    this.view.viewManager.onExtractModelData.invoke();
    const { values } = this.view.viewManager.modelData;

    this.element.className = `range-slider__tooltip range-slider__tooltip_${this.countNumber}`;
    this.element.dataset.sliderCountNumber = this.countNumber.toString();
    this.element.textContent = `${values[this.countNumber]}`;
    this.view.containerElement.append(this.element);
  }

  public update(): void {
    this.view.viewManager.onExtractModelData.invoke();
    const { values } = this.view.viewManager.modelData;

    this.element.textContent = `${values[this.countNumber]}`;

    const position = this.calculatePosition();
    this.setPosition(position);
  }

  private calculatePosition(): Vector {
    this.view.viewManager.onExtractModelData.invoke();
    const { values } = this.view.viewManager.modelData;
    const {
      handleWidth,
      angleInRadians,
      isHandlesSeparated,
      tooltipMargin,
      borderThickness,
    } = this.view.viewManager.data;

    const vectorizedTooltipLength = this.calculateVectorizedTooltipLength(angleInRadians);
    const shiftCoefficient = (isHandlesSeparated ? this.countNumber : 0);
    const handlesCountShift = Vector.calculateVector(Math.abs(handleWidth * shiftCoefficient), angleInRadians);
    let handlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber]);
    handlePosition = handlePosition + handleWidth / 2 - vectorizedTooltipLength / 2;
    const vectorizedHandlePosition = Vector.calculateVector(handlePosition, angleInRadians).sum(handlesCountShift);
    const reverseVectorizedTooltipLength = this.calculateReversedVectorizedTooltipLength(angleInRadians);
    const borderMargin = borderThickness * Math.sin(angleInRadians);
    const vectorizedMargin = Vector.calculateVector(tooltipMargin + reverseVectorizedTooltipLength + borderMargin, angleInRadians);
    const rotatedMargin = vectorizedMargin.rotateVector(Math.PI / 2);
    return vectorizedHandlePosition.sum(rotatedMargin);
  }

  private calculateVectorizedTooltipLength(angleInRadians: number): number {
    const tooltipRect = this.element.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width * Math.cos(angleInRadians);
    const tooltipHeight = tooltipRect.height * Math.sin(angleInRadians);
    return new Vector(tooltipWidth, tooltipHeight).length;
  }

  private calculateReversedVectorizedTooltipLength(angleInRadians: number): number {
    const tooltipRect = this.element.getBoundingClientRect();
    const reverseTooltipWidth = tooltipRect.width * Math.sin(angleInRadians);
    const reverseTooltipHeight = tooltipRect.height * Math.cos(angleInRadians);
    return new Vector(reverseTooltipWidth, reverseTooltipHeight).length;
  }
}

export default Tooltip;
