import OptionPanelElement from './OptionPanelElement';

class MaxValue extends OptionPanelElement {
  public build(): void {
    super.build();

    const modelData = this.view.getModelData();

    // максимальное значение
    const input = document.createElement('input');
    const text = document.createElement('p');

    input.type = 'number';
    input.step = modelData.stepSize.toString();
    input.value = modelData.maxValue.toString();
    input.max = (modelData.maxValue + modelData.stepSize).toString();
    input.min = (modelData.minValue - modelData.stepSize).toString();
    input.className = 'options__input js-options__input';

    text.className = 'options__text';
    text.textContent = 'max value';

    this.DOMElement.append(input);
    this.DOMElement.append(text);

    this.DOMElement.addEventListener('change', this.handlerInputChange);

    this.view.containerElement.append(this.DOMElement);
  }

  public update(): void {
    const { minValue, maxValue, stepSize } = this.view.getModelData();
    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    input.value = `${maxValue}`;
    input.step = `${stepSize}`;
    input.max = `${maxValue + stepSize}`;
    input.min = `${minValue - stepSize}`;
  }

  private handlerInputChange = (event: globalThis.Event) => {
    event.preventDefault();

    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    const inputValue = Number.parseFloat(input.value);

    const dataToUpdate = {
      maxValue: inputValue,
    };

    this.view.setModelData(dataToUpdate);
  };
}

export default MaxValue;
