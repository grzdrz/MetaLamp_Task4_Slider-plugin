/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */

import EventArgs from '../../../Events/EventArgs';
import IMouseData from '../../../Data/IMouseData';
import IModelData from '../../../Data/IModelData';
import Vector from '../../../Helpers/Vector';
import View from '../../View';
import SliderView from '../SliderView';
import SliderPart from './SliderPart';

interface IMouseDownEventArgs {
  handleMouseMove: (event: UIEvent) => void,
  handleMouseUp: (event: UIEvent) => void,
  mousePositionInsideHandle: Vector,
}

class Handle extends SliderPart {
  public countNumber: number;
  public backgroundElement: HTMLElement;

  constructor(view: SliderView, countNumber: number) {
    super(view);
    this.backgroundElement = document.createElement('div');
    this.countNumber = countNumber;
  }

  public build(): void {
    super.build();

    const { handleWidth, handleHeight } = this.view.viewManager.data;

    this.element.className = `range-slider__handle range-slider__handle_${this.countNumber}`;
    this.element.dataset.sliderCountNumber = this.countNumber.toString();
    this.element.style.width = `${handleWidth}px`;
    this.element.style.height = `${handleHeight}px`;
    this.view.containerElement.append(this.element);

    this.backgroundElement.innerHTML = '';
    this.backgroundElement.className = `range-slider__background-handle range-slider__background-handle_${this.countNumber}`;
    this.backgroundElement.dataset.sliderCountNumber = this.countNumber.toString();
    this.view.containerElement.append(this.backgroundElement);

    this.setDragAndDropHandles();
  }

  public update(): void {
    const modelData = this.view.viewManager.getModelData();
    const { values } = modelData;
    const { handleWidth, angleInRadians, isHandlesSeparated } = this.view.viewManager.data;

    const shiftCoefficient = (isHandlesSeparated ? this.countNumber : 0);
    const handlesCountShift = Vector.calculateVector(Math.abs(handleWidth * shiftCoefficient), angleInRadians);
    const handlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber]);

    const vectorizedHandlePosition = Vector.calculateVector(handlePosition, angleInRadians).sum(handlesCountShift);

    this.setPosition(vectorizedHandlePosition);
    this.rotate();

    this.renderBackground(vectorizedHandlePosition);
  }

  private setDragAndDropHandles(): void {
    this.element.ondragstart = () => false;
    this.element.addEventListener('mousedown', this.handleMouseDown);
    this.element.addEventListener('touchstart', this.handleMouseDown);
    this.backgroundElement.addEventListener('mousedown', this.handleMouseDown);
    this.backgroundElement.addEventListener('touchstart', this.handleMouseDown);
  }

  private rotate(): void {
    const { handleWidth, angle } = this.view.viewManager.data;

    const transformOriginX = handleWidth / 2;
    const transformOriginY = handleWidth / 2;
    this.element.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
    this.element.style.transform = `rotate(${-angle}deg)`;
  }

  private renderBackground(position: Vector): void {
    const {
      handleWidth,
      handleHeight,
      angle,
      borderThickness,
    } = this.view.viewManager.data;

    const vectorizedHandleSize = new Vector(handleWidth, handleHeight);

    const backgroundSize = new Vector(borderThickness, borderThickness).multiplyByNumber(2).sum(vectorizedHandleSize);
    const backgroundPosition = new Vector(position.x, position.y).sumNumber(-borderThickness);

    const transformOrigin = backgroundSize.multiplyByNumber(0.5);
    this.backgroundElement.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
    this.backgroundElement.style.transform = `rotate(${-angle}deg)`;

    View.renderPosition(this.backgroundElement, backgroundPosition);
    View.renderSize(this.backgroundElement, backgroundSize);
  }

  private calculateMousePositionInsideHandle(cursorMouseDownPosition: Vector): Vector {
    const { handleHeight } = this.view.viewManager.data;

    const targetSliderBoundingCoords = this.element.getBoundingClientRect();
    const mousePositionInsideTargetSliderX = cursorMouseDownPosition.x - targetSliderBoundingCoords.x;
    const mousePositionInsideTargetSliderY = cursorMouseDownPosition.y - (document.documentElement.clientHeight + window.pageYOffset - targetSliderBoundingCoords.y - handleHeight);
    return new Vector(mousePositionInsideTargetSliderX, mousePositionInsideTargetSliderY);
  }

  private handleMouseDown = (event: UIEvent) => {
    const mousePosition = this.view.calculateMouseGlobalPosition(event);
    const mousePositionInsideHandle = this.calculateMousePositionInsideHandle(mousePosition);

    const optionsForMouseEvents = {
      handleMouseMove: (event: UIEvent): void => { },
      handleMouseUp: (event: UIEvent): void => { },
      mousePositionInsideHandle,
    };
    const handleMouseMove = this.handleMouseMove.bind(this, optionsForMouseEvents);
    optionsForMouseEvents.handleMouseMove = handleMouseMove;

    const handleMouseUp = this.handleMouseUp.bind(this, optionsForMouseEvents);
    optionsForMouseEvents.handleMouseUp = handleMouseUp;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    this.view.viewManager.onMouseDown.invoke(new EventArgs<IMouseData>({ mousePosition }));
  };

  private handleMouseMove(optionsFromMouseDown: IMouseDownEventArgs, event: UIEvent): void {
    const {
      mousePositionInsideHandle,
    } = optionsFromMouseDown;

    const mousePosition = this.view.calculateMouseGlobalPosition(event);
    const mousePositionInsideContainer = this.view.calculateMousePositionInsideContainer(mousePosition, mousePositionInsideHandle);

    const proportionalValue = this.view.calculateProportionalValue(mousePositionInsideContainer, this.countNumber);
    const { values } = this.view.viewManager.getModelData();
    values[this.countNumber] = proportionalValue;
    this.view.viewManager.onHandleMove.invoke(new EventArgs<IModelData>({ values }));
    this.view.viewManager.onMouseMove.invoke(new EventArgs<IMouseData>({ mousePosition }));
  }

  private handleMouseUp(optionsFromMouseDown: IMouseDownEventArgs, event: UIEvent): void {
    document.removeEventListener('mousemove', optionsFromMouseDown.handleMouseMove);
    document.removeEventListener('mouseup', optionsFromMouseDown.handleMouseUp);
    document.removeEventListener('touchmove', optionsFromMouseDown.handleMouseMove);
    document.removeEventListener('touchend', optionsFromMouseDown.handleMouseUp);

    const mousePosition = this.view.calculateMouseGlobalPosition(event);
    this.view.viewManager.onMouseUp.invoke(new EventArgs<IMouseData>({ mousePosition }));
  }
}

export default Handle;
