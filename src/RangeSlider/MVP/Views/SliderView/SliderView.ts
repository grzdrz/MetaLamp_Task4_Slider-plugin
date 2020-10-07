import MathFunctions from '../../../Helpers/MathFunctions';
import Vector from '../../../Helpers/Vector';
import View from '../View';
import SliderPart from './SliderParts/SliderPart';
import Handle from './SliderParts/Handle';
import FilledStrip from './SliderParts/FilledStrip';
import EmptyStrip from './SliderParts/EmptyStrip';
import Scale from './SliderParts/Scale';
import Tooltip from './SliderParts/Tooltip';

class SliderView extends View {
  public parts: SliderPart[] = [];

  public initialize(): void {
    const resizeObserver = new ResizeObserver(this.handleViewportSizeChange);
    const htmlElement = this.viewManager.containerElement;
    resizeObserver.observe(htmlElement);

    this.update(true);
  }

  public build(): void {
    const modelData = this.viewManager.getModelData();
    this.parts = [];

    this.containerElement.innerHTML = '';
    this.renderContainer();

    this.parts.push(new EmptyStrip(this));
    modelData.values.forEach((value, index) => {
      this.parts.push(new Handle(this, index));
    });
    if (this.viewManager.data.hasTooltip) {
      modelData.values.forEach((value, index) => {
        this.parts.push(new Tooltip(this, index));
      });
    }
    this.viewManager.data.filledStrips.forEach((value, index) => {
      if (value) this.parts.push(new FilledStrip(this, index));
    });
    if (this.viewManager.data.hasScale) {
      this.parts.push(new Scale(this));
    }
    this.parts.forEach((part) => {
      part.build();
    });
  }

  public update(isNeedRebuild: boolean): void {
    if (isNeedRebuild) {
      this.build();
      this.parts.forEach((part) => {
        part.update();
      });
    } else {
      this.parts.forEach((part) => {
        part.update();
      });
    }
    this.renderContainer();
  }

  public calculateProportionalValue(cursorPositionInContainer: Vector, handleCountNumber?: number): number {
    const modelData = this.viewManager.getModelData();
    const {
      sliderLength,
      handleWidth,
      angleInRadians,
      isHandlesSeparated,
    } = this.viewManager.data;

    let shiftCoefficient;
    if (handleCountNumber !== undefined) shiftCoefficient = isHandlesSeparated ? handleCountNumber : 0;
    else shiftCoefficient = isHandlesSeparated ? modelData.values.length / 2 : 0.5;

    const maxShiftCoefficient = (isHandlesSeparated ? modelData.values.length : 1);
    const vectorizedShift = Vector.calculateVector(handleWidth * shiftCoefficient, angleInRadians);
    cursorPositionInContainer = cursorPositionInContainer.subtract(vectorizedShift);
    const containerCapacity = sliderLength - handleWidth * maxShiftCoefficient;

    const mainAxisVector = Vector.calculateVector(sliderLength, angleInRadians);
    const cursorPositionProjectionOnSliderMainAxis = cursorPositionInContainer.calculateVectorProjectionOnTargetVector(mainAxisVector);

    const proportionalValue = (modelData.deltaMaxMin * cursorPositionProjectionOnSliderMainAxis) / (containerCapacity) + modelData.minValue;
    return proportionalValue;
  }

  public calculateProportionalPixelValue(value: number): number {
    const modelData = this.viewManager.getModelData();
    const { sliderLength, handleWidth, isHandlesSeparated } = this.viewManager.data;

    const maxShiftCoefficient = (isHandlesSeparated ? modelData.values.length : 1);
    const usedLength = sliderLength - handleWidth * maxShiftCoefficient;

    return ((value - modelData.minValue) * usedLength) / modelData.deltaMaxMin;
  }

  public calculateMouseGlobalPosition(event: UIEvent): Vector {
    let x;
    let y;
    if (event instanceof TouchEvent) {
      const touchEvent = event;
      x = touchEvent.changedTouches[0].pageX;
      y = touchEvent.changedTouches[0].pageY;
    } else {
      const mouseEvent = <MouseEvent>event;
      x = mouseEvent.clientX;
      y = mouseEvent.clientY;
    }
    y = (document.documentElement.clientHeight + window.pageYOffset) - y;

    return new Vector(x, y);
  }

  public calculateMousePositionInsideContainer(mouseGlobalPosition: Vector, mousePositionInsideTargetSlider?: Vector): Vector {
    const containerBoundingRect = this.containerElement.getBoundingClientRect();
    const containerCoord = new Vector(
      containerBoundingRect.x,
      (document.documentElement.clientHeight + window.pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height),
    );

    if (mousePositionInsideTargetSlider) {
      return mouseGlobalPosition.subtract(containerCoord).subtract(mousePositionInsideTargetSlider);
    }
    return mouseGlobalPosition.subtract(containerCoord);
  }

  public setClosestHandle(targetValue: number): number[] {
    const { values } = this.viewManager.getModelData();

    const deltaValuesToTargetValue = values.map((value, index) => ({
      index,
      deltaValue: Math.abs(value - targetValue),
    }));

    const sortedDeltaValues = deltaValuesToTargetValue.sort((a, b) => a.deltaValue - b.deltaValue);
    const smallestDeltaValues = sortedDeltaValues.filter((tuple) => tuple.deltaValue === sortedDeltaValues[0].deltaValue);
    const closestValues = smallestDeltaValues.map((tuple) => ({ index: tuple.index, value: values[tuple.index] }));

    const firstClosestValue = closestValues[0].value;
    const isTargetValueToRightOfClosestValues = targetValue > firstClosestValue;
    const isTargetValueToLeftOfClosestValues = targetValue < firstClosestValue;
    if (isTargetValueToRightOfClosestValues) {
      const indexOfLastClosestValue = closestValues.length - 1;
      values[closestValues[indexOfLastClosestValue].index] = targetValue;
    } else if (isTargetValueToLeftOfClosestValues) {
      const indexOfFirstClosestValue = 0;
      values[closestValues[indexOfFirstClosestValue].index] = targetValue;
    }

    return values;
  }

  private renderContainer(): void {
    const { sliderLength, angleInRadians } = this.viewManager.data;

    this.calculateSliderLength();

    const size = Vector.calculateVector(sliderLength, angleInRadians);
    View.renderSize(this.containerElement, size);
  }

  private calculateSliderLength(): void {
    const { angleInRadians, borderThickness } = this.viewManager.data;

    const rangleSlider = <HTMLElement>(this.containerElement.closest('.range-slider'));
    const boundingRect = rangleSlider.getBoundingClientRect();

    const containerActiveWidth = boundingRect.width - borderThickness * 2;
    const containerActiveHeight = boundingRect.height - borderThickness * 2;
    const sliderLength = MathFunctions.calculateEllipseSurfacePointCoordinate(containerActiveWidth, containerActiveHeight, angleInRadians).length;
    this.viewManager.data.sliderLength = sliderLength;
  }

  private handleViewportSizeChange = () => {
    this.renderContainer();
    this.update(false);
  };
}

export default SliderView;
