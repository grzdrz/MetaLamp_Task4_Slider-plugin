import OptionPanelElement from './OptionPanelElement';

class StepSize extends OptionPanelElement {
  public build(): void {
    super.build();

    const modelData = this.view.getModelData();

    const input = document.createElement('input');
    const text = document.createElement('p');

    input.type = 'number';
    input.step = '1';
    input.value = modelData.stepSize.toString();
    input.className = 'options__input js-options__input js-options__step-size-input';

    text.className = 'options__text';
    text.textContent = 'step size';

    this.DOMElement.append(input);
    this.DOMElement.append(text);

    this.DOMElement.addEventListener('change', this.handlerInputChange);

    this.view.containerElement.append(this.DOMElement);
  }

  public update(): void {
    const { stepSize } = this.view.getModelData();
    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    input.value = `${stepSize}`;
  }

  private handlerInputChange = (event: globalThis.Event) => {
    event.preventDefault();

    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    let inputValue = Number.parseFloat(input.value);
    if (inputValue <= 0) {
      inputValue = 0.000001;
      input.value = inputValue.toString();
    }

    const dataToUpdate = {
      stepSize: inputValue,
    };

    this.view.setModelData(dataToUpdate);
  };
}

export default StepSize;
