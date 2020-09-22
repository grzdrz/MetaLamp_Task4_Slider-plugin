import SliderPart from './SliderPart';
import Vector from '../../../../Helpers/Vector';
import EventArgs from '../../../../Events/EventArgs';
import IModelData from '../../../../Data/IModelData';
import SliderView from '../SliderView';

class EmptyStrip extends SliderPart {
  constructor(view: SliderView) {
    super(view);

    this.initialize();
  }

  public initialize(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  public build(): void {
    super.build();

    this.element.className = 'range-slider__empty-strip';
    this.view.containerElement.append(this.element);
  }

  public update(): void {
    const {
      sliderLength,
      handleHeight,
      sliderStripThickness,
    } = this.view.viewManager.data;

    this.rotate();

    const size = new Vector(sliderLength, sliderStripThickness);
    const position = new Vector(0, handleHeight / 2 - (sliderStripThickness) / 2);
    this.setSize(size);
    this.setPosition(position);
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
    const values = this.view.setClosestHandle(proportionalValue);
    this.view.viewManager.onHandleMove.invoke(new EventArgs<IModelData>({ values }));
  };
}

export default EmptyStrip;
