import SliderPart from './SliderPart';
import Vector from '../../../../Helpers/Vector';
import SliderView from '../SliderView';
import EventArgs from '../../../../Events/EventArgs';
import IModelData from '../../../../Data/IModelData';

interface ISizeCalculationParameters {
  vectorizedLastHandlePosition: Vector,
  vectorizedFirstHandlePosition: Vector,
  vectorizedHandleWidth: Vector,
  handlesCountShift: Vector,
}

class FilledStrip extends SliderPart {
  public countNumber = 0;

  constructor(view: SliderView, countNumber: number) {
    super(view);
    this.countNumber = countNumber;

    this.initialize();
  }

  public initialize(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  public build(): void {
    super.build();

    this.element.className = `range-slider__filled-strip range-slider__filled-strip_${this.countNumber}`;
    this.view.containerElement.append(this.element);
  }

  public update(): void {
    const modelData = this.view.viewManager.getModelData();
    const { values } = modelData;
    const {
      handleWidth,
      angleInRadians,
      isHandlesSeparated,
    } = this.view.viewManager.data;

    this.rotate();

    const vectorizedHandleWidth = Vector.calculateVector(handleWidth, angleInRadians);
    const shiftCoefficient = isHandlesSeparated ? this.countNumber : 0;
    const handlesCountShift = Vector.calculateVector(Math.abs(handleWidth * shiftCoefficient - handleWidth / 2), angleInRadians);
    const firstHandlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber - 1]);
    const lastHandlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber]);
    const vectorizedFirstHandlePosition = Vector.calculateVector(firstHandlePosition, angleInRadians);
    const vectorizedLastHandlePosition = Vector.calculateVector(lastHandlePosition, angleInRadians);

    const size = this.calculateSize({
      vectorizedLastHandlePosition,
      vectorizedFirstHandlePosition,
      vectorizedHandleWidth,
      handlesCountShift,
    });
    const position = this.calculatePosition(vectorizedFirstHandlePosition, handlesCountShift);
    this.setSize(size);
    this.setPosition(position);
  }

  private calculateSize(args: ISizeCalculationParameters) {
    const modelData = this.view.viewManager.getModelData();
    const {
      handleWidth,
      angleInRadians,
      sliderStripThickness,
      isHandlesSeparated,
      filledStrips,
    } = this.view.viewManager.data;
    const {
      vectorizedLastHandlePosition,
      vectorizedFirstHandlePosition,
      vectorizedHandleWidth,
      handlesCountShift,
    } = args;

    let size;
    if (this.countNumber === 0) {
      const width = vectorizedLastHandlePosition.sum(handlesCountShift).length;
      size = new Vector(width, sliderStripThickness);
    } else if (this.countNumber === filledStrips.length - 1) {
      const maxValueLength = this.view.calculateProportionalPixelValue(modelData.maxValue);
      const vectorizedMaxValueLength = Vector.calculateVector(maxValueLength - handleWidth / 2, angleInRadians);
      const width = vectorizedMaxValueLength.subtract(vectorizedFirstHandlePosition).sum(vectorizedHandleWidth).length;
      size = new Vector(width, sliderStripThickness);
    } else {
      let width = vectorizedLastHandlePosition.subtract(vectorizedFirstHandlePosition);
      if (isHandlesSeparated) width = width.sum(vectorizedHandleWidth);
      size = new Vector(width.length, sliderStripThickness);
    }
    return size;
  }

  private calculatePosition(vectorizedFirstHandlePosition: Vector, handlesCountShift: Vector) {
    const {
      handleHeight,
      sliderStripThickness,
    } = this.view.viewManager.data;

    const yShift = handleHeight / 2 - sliderStripThickness / 2;

    let position;
    if (this.countNumber === 0) {
      position = new Vector(0, yShift);
    } else {
      position = vectorizedFirstHandlePosition.sum(handlesCountShift).sum(new Vector(0, yShift));
    }

    return position;
  }

  private rotate(): void {
    const {
      handleWidth,
      angle,
      sliderStripThickness,
    } = this.view.viewManager.data;

    const transformOriginX = handleWidth / 2;
    const transformOriginY = sliderStripThickness / 2;
    this.element.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
    this.element.style.transform = `rotate(${-angle}deg)`;
  }

  private handleClick = (event: UIEvent) => {
    const mousePosition = this.view.calculateMouseGlobalPosition(event);
    const mousePositionInsideContainer = this.view.calculateMousePositionInsideContainer(mousePosition);

    const proportionalValue = this.view.calculateProportionalValue(mousePositionInsideContainer);
    const values = this.view.findHandle(proportionalValue);
    this.view.viewManager.onHandleMove.invoke(new EventArgs<IModelData>({ values }));
  };
}

export default FilledStrip;
