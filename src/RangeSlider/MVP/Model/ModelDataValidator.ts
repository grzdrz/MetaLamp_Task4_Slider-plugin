import IModelData from '../../Data/IModelData';
import IViewData from '../../Data/IViewData';
import EventArgs from '../../Events/EventArgs';
import MathFunctions from '../../Helpers/MathFunctions';
import Model from './Model';

class ModelDataValidator {
  public model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public validateValues(data: IModelData): void {
    const wasSliderParametersChanged = data.stepSize !== undefined || data.maxValue !== undefined || data.minValue !== undefined;
    if (wasSliderParametersChanged) {
      if (data.values !== undefined) this.model.data.values = data.values;
      this.model.data.values = this.model.data.values.map((value, index) => this.validateValue(value, index, true));
      this.valuesChanged();
    } else if (data.values !== undefined && data.values.length > 0) {
      // проверяем был ли сдвинут какой либо ползунок
      let changedValueIndex = -1;
      let deltaDirection = 0;
      data.values.forEach((e, i) => {
        if (e !== this.model.data.values[i]) changedValueIndex = i;
      });
      if (changedValueIndex !== -1) deltaDirection = data.values[changedValueIndex] - this.model.data.values[changedValueIndex];
      const wasHandleMove = (changedValueIndex !== -1 && deltaDirection !== 0);

      this.model.data.values = data.values;

      if (this.model.data.values.length > 1 && wasHandleMove) {
        if (deltaDirection > 0) { // протаскивание всех ползунков после текущего
          this.model.data.values[changedValueIndex] = this.validateValue(this.model.data.values[changedValueIndex], changedValueIndex, this.model.data.canPush);
          for (let i = changedValueIndex + 1; i < this.model.data.values.length; i += 1) {
            this.model.data.values[i] = this.validateValue(this.model.data.values[i], i, !this.model.data.canPush);
          }
        } else { // протаскивание всех ползунков до текущего
          this.model.data.values[changedValueIndex] = this.validateValue(this.model.data.values[changedValueIndex], changedValueIndex, this.model.data.canPush);
          for (let i = changedValueIndex - 1; i >= 0; i -= 1) {
            this.model.data.values[i] = this.validateValue(this.model.data.values[i], i, !this.model.data.canPush);
          }
        }
      } else if (this.model.data.values.length === 1) {
        this.model.data.values[0] = this.validateValue(this.model.data.values[0], 0, false);
      }
      this.valuesChanged();
    }
  }

  public valuesChanged(): void {
    const viewData = this.model.getViewData();
    const { filledStrips } = viewData;
    const newFilledStrips = new Array<boolean>();
    for (let i = 0; i < this.model.data.values.length + 1; i += 1) {
      if (i < filledStrips.length) {
        newFilledStrips.push(filledStrips[i]);
      } else {
        newFilledStrips.push(false);
      }
    }

    this.model.onSetViewData.invoke(new EventArgs<IViewData>({ filledStrips: newFilledStrips }));
  }

  public validateValue(value: number, countNumber: number, canPush: boolean): number {
    const newTargetInputValue = this.calculateNearestPositionForHandle(value);

    const { values } = this.model.data;

    if (newTargetInputValue > values[countNumber + 1] && !canPush) return values[countNumber + 1];
    if (newTargetInputValue < values[countNumber - 1] && !canPush) return values[countNumber - 1];
    return this.validateGoingOutOfBounds(newTargetInputValue);
  }

  public validateGoingOutOfBounds(value: number): number {
    const { minValue, maxValue } = this.model.data;
    if (value < minValue) return minValue;
    if (value > maxValue) return maxValue;
    return value;
  }

  public validateMaxValue(stepSize: number, maxValue: number): number {
    const dMaxMin = maxValue - this.model.data.minValue;
    if (dMaxMin <= 0) return this.model.data.minValue + stepSize;

    const valueOfOneStep = dMaxMin / stepSize;
    const fraction = MathFunctions.getFractionOfNumber(valueOfOneStep);

    if (fraction === 0) return maxValue;

    const roundedValueOfOneStep = Math.round(valueOfOneStep);
    return stepSize * roundedValueOfOneStep + this.model.data.minValue;
  }

  public validateMinValue(minValue: number, stepSize: number): number {
    const dMaxMin = this.model.data.maxValue - minValue;
    if (dMaxMin <= 0) return this.model.data.maxValue - stepSize;

    const valueOfOneStep = (this.model.data.maxValue - minValue) / stepSize;
    const fraction = MathFunctions.getFractionOfNumber(valueOfOneStep);

    if (fraction === 0) return minValue;

    const roundedValueOfOneStep = Math.round(valueOfOneStep);
    return this.model.data.maxValue - stepSize * roundedValueOfOneStep;
  }

  // подменяем текущее значение инпута на число к которому ближе всего текущее значение курсора
  // т.е. например шаг 10, значение 78 -> на выходе получаем 80,
  // или например  шаг 10, значение 73 -> на выходе получаем 70
  public calculateNearestPositionForHandle(value: number): number {
    let absoluteValue;
    let resultValue;
    const { minValue, stepSize } = this.model.data;
    if (minValue < 0) {
      absoluteValue = (value + Math.abs(minValue)) / stepSize;
      const roundedAbsoluteValue = Math.round(absoluteValue);
      resultValue = roundedAbsoluteValue * stepSize - Math.abs(minValue);
    } else {
      absoluteValue = (value - Math.abs(minValue)) / stepSize;
      const roundedAbsoluteValue = Math.round(absoluteValue);
      resultValue = roundedAbsoluteValue * stepSize + Math.abs(minValue);
    }
    return MathFunctions.cutOffJunkValuesFromFraction(resultValue, stepSize);
  }
}

export default ModelDataValidator;
