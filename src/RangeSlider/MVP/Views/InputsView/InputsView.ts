import View from '../View';
import EventArgs from '../../../Events/EventArgs';
import IModelData from '../../../Data/IModelData';

class InputsView extends View {
  public valueInputsDOMElements: HTMLInputElement[] = new Array<HTMLInputElement>();

  public initialize(): void {
    this.build();
    this.update(false);
  }

  public build(): void {
    const modelData = this.viewManager.getModelData();

    this.containerElement.innerHTML = '';
    this.valueInputsDOMElements = [];

    for (let i = 0; i < modelData.values.length; i += 1) {
      const valueInputContainer = document.createElement('div');
      const valueInput = document.createElement('input');
      this.valueInputsDOMElements.push(valueInput);
      const valueInputText = document.createElement('p');

      valueInputContainer.className = `range-slider__input-container range-slider__input-container_${i}`;
      valueInput.dataset.countNumber = `${i}`;
      valueInput.className = `range-slider__input range-slider__input_${i}`;
      valueInput.value = `${modelData.minValue}`;
      valueInputText.className = 'range-slider__input-text';
      valueInputText.textContent = `value ${i + 1}`;

      valueInputContainer.append(valueInput);
      valueInputContainer.append(valueInputText);
      this.containerElement.append(valueInputContainer);

      valueInput.addEventListener('change', this.handleInputChange);
    }
  }

  public update(isNeedRebuild: boolean): void {
    const modelData = this.viewManager.getModelData();

    const { values } = modelData;
    if (isNeedRebuild) this.build();
    this.valueInputsDOMElements.forEach((element, i) => {
      element.value = values[i].toString();
    });
  }

  private handleInputChange = () => {
    const modelData = this.viewManager.getModelData();

    const { values } = modelData;
    this.valueInputsDOMElements.forEach((element, i) => {
      const value = Number.parseFloat(element.value);
      values[i] = value;
    });

    this.viewManager.onInputsChange.invoke(new EventArgs<IModelData>({ values }));
  };
}

export default InputsView;
