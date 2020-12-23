import IInputData from '../../../Data/IInputData';
import EventArgs from '../../../Events/EventArgs';
import InputsView from '../InputsView';

class ValueInput {
  public element: HTMLInputElement;
  public view: InputsView;
  public id: number;

  constructor(view: InputsView, id: number) {
    this.view = view;
    this.id = id;
    this.element = document.createElement('input');
  }

  public build(): void {
    this.element = document.createElement('input');
    this.element.className = `range-slider__input range-slider__input_${this.id}`;

    this.element.addEventListener('change', this.handleInputChange);
  }

  private handleInputChange = () => {
    this.view.viewManager.onInputsChange.invoke(new EventArgs<IInputData>({
      value: Number.parseInt(this.element.value, 10),
      id: this.id,
    }));
  };
}

export default ValueInput;
