import Vector from '../../Helpers/Vector';
import ModelData from '../../Data/ModelData';
import View from '../View';
import SliderPart from './SliderParts/SliderPart';
import Handle from './SliderParts/Handle';
import FilledStrip from './SliderParts/FilledStrip';
import EmptyStrip from './SliderParts/EmptyStrip';
import Scale from './SliderParts/Scale';
import Tooltip from './SliderParts/Tooltip';
import MathFunctions from '../../Helpers/MathFunctions';

class SliderView extends View {
  public parts: SliderPart[] = [];

  public initialize(modelData: ModelData): void {
    this.update(modelData, true);
  }

  public build(modelData: ModelData): void {
    const { values, filledStrips } = modelData;
    this.parts = [];

    this.containerElement.innerHTML = '';
    this.renderContainer();

    this.parts.push(new EmptyStrip(this));
    values.forEach((value, index) => {
      this.parts.push(new Handle(this, index));
    });
    if (this.viewManager.data.hasTooltip) {
      values.forEach((value, index) => {
        this.parts.push(new Tooltip(this, index));
      });
    }
    filledStrips.forEach((value, index) => {
      if (value) this.parts.push(new FilledStrip(this, index));
    });
    if (this.viewManager.data.hasScale) {
      this.parts.push(new Scale(this));
    }
    this.parts.forEach((part) => {
      part.build(modelData);
    });
  }

  public update(modelData: ModelData, isNeedRebuild: boolean): void {
    if (isNeedRebuild) {
      this.build(modelData);
      this.parts.forEach((part) => {
        part.update(modelData);
      });
    } else {
      this.parts.forEach((part) => {
        part.update(modelData);
      });
    }
    this.renderContainer();
  }

  public calculateProportionalPixelValue(modelData: ModelData, value: number): number {
    const { values, deltaMaxMin, minValue } = modelData;
    const { sliderLength, handleWidth, isHandlesSeparated } = this.viewManager.data;

    const maxShiftCoefficient = (isHandlesSeparated ? values.length : 1);
    const usedLength = sliderLength - handleWidth * maxShiftCoefficient;

    return ((value - minValue) * usedLength) / deltaMaxMin;
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
    const containerCoordinates = new Vector(
      containerBoundingRect.x,
      (document.documentElement.clientHeight + window.pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height),
    );

    if (mousePositionInsideTargetSlider) {
      return mouseGlobalPosition.subtract(containerCoordinates).subtract(mousePositionInsideTargetSlider);
    }
    return mouseGlobalPosition.subtract(containerCoordinates);
  }

  public renderContainer(): void {
    const { sliderLength, angleInRadians } = this.viewManager.data;

    this.calculateSliderLength();

    const size = Vector.calculateVector(sliderLength, angleInRadians);
    View.renderSize(this.containerElement, size);
  }

  public calculateSliderLength(): void {
    const { angleInRadians, borderThickness } = this.viewManager.data;

    const rangeSlider = <HTMLElement>(this.containerElement.closest('.range-slider'));
    const boundingRect = rangeSlider.getBoundingClientRect();

    const containerActiveWidth = boundingRect.width - borderThickness * 2;
    const containerActiveHeight = boundingRect.height - borderThickness * 2;
    const sliderLength = MathFunctions.calculateEllipseSurfacePointCoordinate(containerActiveWidth, containerActiveHeight, angleInRadians).length;
    this.viewManager.data.sliderLength = sliderLength;
  }
}

export default SliderView;
