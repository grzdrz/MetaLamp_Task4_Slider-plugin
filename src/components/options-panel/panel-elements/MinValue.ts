import OptionPanelElement from './OptionPanelElement';

class MinValue extends OptionPanelElement {
  public build(): void {
    super.build();

    const modelData = this.view.getModelData();

    const input = document.createElement('input');
    const text = document.createElement('p');

    input.type = 'number';
    input.step = modelData.stepSize.toString();
    input.value = modelData.minValue.toString();
    input.max = (modelData.maxValue + modelData.stepSize).toString();
    input.min = (modelData.minValue - modelData.stepSize).toString();
    input.className = 'options__input js-options__input';

    text.className = 'options__text';
    text.textContent = 'min value';

    this.DOMElement.append(input);
    this.DOMElement.append(text);

    this.DOMElement.addEventListener('change', this.handlerInputChange);

    this.view.containerElement.append(this.DOMElement);
  }

  public update(): void {
    const { minValue, maxValue, stepSize } = this.view.getModelData();
    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    input.value = `${minValue}`;
    input.step = `${stepSize}`;
    input.max = `${maxValue + stepSize}`;
    input.min = `${minValue - stepSize}`;
  }

  private handlerInputChange = (event: globalThis.Event) => {
    event.preventDefault();

    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    const inputValue = Number.parseFloat(input.value);

    const dataToUpdate = {
      minValue: inputValue,
    };

    this.view.setModelData(dataToUpdate);
  };
}

export default MinValue;
