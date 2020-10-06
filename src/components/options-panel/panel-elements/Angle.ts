import OptionPanelElement from './OptionPanelElement';

class Angle extends OptionPanelElement {
  public build(): void {
    super.build();

    const { angle } = this.view.getViewData();

    const input = document.createElement('input');
    input.type = 'number';
    input.step = '1';
    input.value = angle.toString();
    input.className = 'options__input js-options__input';

    const text = document.createElement('p');
    text.className = 'options__text';
    text.textContent = 'angle size';

    this.DOMElement.append(input);
    this.DOMElement.append(text);

    this.DOMElement.addEventListener('change', this.handleInputChange);

    this.view.containerElement.append(this.DOMElement);
  }

  public update(): void {
    const { angle } = this.view.getViewData();
    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    input.value = `${angle}`;
  }

  private handleInputChange = (event: globalThis.Event) => {
    event.preventDefault();

    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    const inputValue = Number.parseInt(input.value, 10);

    input.value = inputValue.toString();

    const dataToUpdate = {
      angle: inputValue,
    };

    this.view.setViewData(dataToUpdate);
  };
}

export default Angle;
