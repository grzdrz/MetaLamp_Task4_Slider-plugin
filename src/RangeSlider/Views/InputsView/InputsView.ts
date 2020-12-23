import View from '../View';
import ModelData from '../../Data/ModelData';
import ValueInput from './InputParts/ValueInput';

class InputsView extends View {
  public valueInputs: ValueInput[] = new Array<ValueInput>();

  public initialize(modelData: ModelData): void {
    this.build(modelData);
    this.update(modelData, false);
  }

  public build(modelData: ModelData): void {
    const { values } = modelData;

    this.containerElement.innerHTML = '';
    this.valueInputs = [];

    for (let i = 0; i < values.length; i += 1) {
      const valueInput = new ValueInput(this, i);
      valueInput.build();
      this.valueInputs.push(valueInput);
      this.containerElement.append(valueInput.element);
    }
  }

  public update(modelData: ModelData, isNeedRebuild: boolean): void {
    const { values } = modelData;

    if (isNeedRebuild) this.build(modelData);
    this.valueInputs.forEach((input, i) => {
      input.element.value = values[i].toString();
    });
  }
}

export default InputsView;
