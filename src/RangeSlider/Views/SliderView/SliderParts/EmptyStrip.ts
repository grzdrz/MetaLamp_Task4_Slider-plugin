import Vector from '../../../Helpers/Vector';
import EventArgs from '../../../Events/EventArgs';
import IHandleData from '../../../Data/IHandleData';
import ModelData from '../../../Data/ModelData';
import SliderView from '../SliderView';
import SliderPart from './SliderPart';

class EmptyStrip extends SliderPart {
  constructor(view: SliderView) {
    super(view);

    this.initialize();
  }

  public initialize(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  public build(modelData: ModelData): void {
    super.build(modelData);

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

    this.view.viewManager.onEmptyRailClick.invoke(new EventArgs<IHandleData>({
      viewData: this.view.viewManager.data,
      mousePosition: mousePositionInsideContainer,
    }));
  };
}

export default EmptyStrip;
