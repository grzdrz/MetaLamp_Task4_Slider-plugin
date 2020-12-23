import ModelData from '../../../Data/ModelData';
import Vector from '../../../Helpers/Vector';
import View from '../../View';
import SliderView from '../SliderView';

abstract class SliderPart {
  public element: HTMLElement;

  public view: SliderView;

  constructor(view: SliderView) {
    this.view = view;
    this.element = document.createElement('div');
  }

  public build(modelData: ModelData): void {
    this.element.innerHTML = '';
  }

  public abstract update(modelData: ModelData): void;

  protected setPosition(position: Vector): void {
    View.renderPosition(this.element, position);
  }

  protected setSize(size: Vector): void {
    View.renderSize(this.element, size);
  }
}

export default SliderPart;
