import IHandleData from '../Data/IHandleData';
import IModelData from '../Data/IModelData';
import ModelData from '../Data/ModelData';
import ViewData from '../Data/ViewData';
import Event from '../Events/Event';
import EventArgs from '../Events/EventArgs';
import Vector from '../Helpers/Vector';
import ModelDataValidator from './ModelDataValidator';

class Model {
  public data: ModelData;
  public viewData = new ViewData({});
  public validator: ModelDataValidator;

  public onUpdated = new Event<IModelData>();
  public onValuesUpdated = new Event<IModelData>();

  constructor(data: ModelData) {
    this.data = data;
    this.validator = new ModelDataValidator(this);
  }

  public initialize(): void {
    this.updateData(this.data);
  }

  public updateData(data: IModelData): void {
    const oldValues = [...this.data.values];
    const oldFilledStrips = [...this.data.filledStrips];
    const oldMaxValue = this.data.maxValue;
    const oldMinValue = this.data.minValue;

    if (data.canPush !== undefined) this.data.canPush = data.canPush;
    if (data.minValue !== undefined) {
      this.data.minValue = this.validator.validateMinValue(data.minValue, this.data.stepSize);
    }
    if (data.maxValue !== undefined) {
      this.data.maxValue = this.validator.validateMaxValue(this.data.stepSize, data.maxValue);
    }
    if (data.stepSize !== undefined) {
      this.data.stepSize = data.stepSize;
      this.data.maxValue = this.validator.validateMaxValue(data.stepSize, this.data.maxValue);
    }
    if (data.filledStrips !== undefined) {
      this.data.filledStrips = this.validator.validateFilledStrips(data.filledStrips);
    }
    this.validator.validateValues(data);

    const newValues = [...this.data.values];
    const newFilledStrips = [...this.data.filledStrips];
    const newMaxValue = this.data.maxValue;
    const newMinValue = this.data.minValue;

    const valuesCountChanged = oldValues.length !== newValues.length;
    const filledStripsEquals = this.compareFilledStrips(oldFilledStrips, newFilledStrips);
    const extremeValuesChanged = oldMaxValue !== newMaxValue || oldMinValue !== newMinValue;

    const needFullReRender = valuesCountChanged || !filledStripsEquals || extremeValuesChanged;
    if (needFullReRender) this.onUpdated.invoke(new EventArgs(this.getData()));
    else this.onValuesUpdated.invoke(new EventArgs(this.getData()));
  }

  public compareFilledStrips(oldFilledStrips: boolean[], newFilledStrips: boolean[]): boolean {
    if (oldFilledStrips.length !== newFilledStrips.length) return false;
    return oldFilledStrips.every((strip, index) => strip === newFilledStrips[index]);
  }

  public valuesChange = (handleData: IHandleData): void => {
    const changedValue = this.calculateProportionalValue(handleData);
    const values = [...this.data.values];
    if (handleData.countNumber !== undefined) values[handleData.countNumber] = changedValue;

    this.updateData({ values });
  };

  public clickByScale = (targetValue: number): void => {
    const values = this.setClosestHandle(targetValue);

    this.updateData({ values });
  };

  public calculateProportionalValue(handleData: IHandleData/* cursorPositionInContainer: Vector, handleCountNumber?: number */): number {
    const { values, deltaMaxMin, minValue } = this.data/* this.viewManager.modelData */;
    const {
      sliderLength,
      handleWidth,
      angleInRadians,
      isHandlesSeparated,
    } = handleData.viewData/* this.viewManager.data */;
    const { mousePosition, countNumber } = handleData;

    let shiftCoefficient;
    if (countNumber/* handleCountNumber */ !== undefined) shiftCoefficient = isHandlesSeparated ? countNumber/* handleCountNumber */ : 0;
    else shiftCoefficient = isHandlesSeparated ? values.length / 2 : 0.5;

    const maxShiftCoefficient = (isHandlesSeparated ? values.length : 1);
    const vectorizedShift = Vector.calculateVector(handleWidth * shiftCoefficient, angleInRadians);
    /* cursorPositionInContainer = cursorPositionInContainer.subtract(vectorizedShift); */
    const shiftedCursorPositionInContainer = mousePosition.subtract(vectorizedShift);
    const containerCapacity = sliderLength - handleWidth * maxShiftCoefficient;

    const mainAxisVector = Vector.calculateVector(sliderLength, angleInRadians);
    let cursorPositionProjectionOnSliderMainAxis = shiftedCursorPositionInContainer/* cursorPositionInContainer */
      .calculateVectorProjectionOnTargetVector(mainAxisVector);
    if (cursorPositionProjectionOnSliderMainAxis < 0) cursorPositionProjectionOnSliderMainAxis = 0;
    else if (cursorPositionProjectionOnSliderMainAxis > sliderLength) cursorPositionProjectionOnSliderMainAxis = sliderLength;

    const proportionalValue = (deltaMaxMin * cursorPositionProjectionOnSliderMainAxis) / (containerCapacity) + minValue;
    return proportionalValue;
  }

  public setClosestHandle(targetValue: number): number[] {
    const { values } = this.data/* this.viewManager.modelData */;

    const deltaValuesToTargetValue = values.map((value, index) => ({
      index,
      deltaValue: Math.abs(value - targetValue),
    }));

    const sortedDeltaValues = deltaValuesToTargetValue.sort((a, b) => a.deltaValue - b.deltaValue);
    const smallestDeltaValues = sortedDeltaValues.filter((tuple) => tuple.deltaValue === sortedDeltaValues[0].deltaValue);
    const closestValues = smallestDeltaValues.map((tuple) => ({ index: tuple.index, value: values[tuple.index] }));

    const firstClosestValue = closestValues[0].value;
    const isTargetValueToRightOfClosestValues = targetValue > firstClosestValue;
    const isTargetValueToLeftOfClosestValues = targetValue < firstClosestValue;
    if (isTargetValueToRightOfClosestValues) {
      const indexOfLastClosestValue = closestValues.length - 1;
      values[closestValues[indexOfLastClosestValue].index] = targetValue;
    } else if (isTargetValueToLeftOfClosestValues) {
      const indexOfFirstClosestValue = 0;
      values[closestValues[indexOfFirstClosestValue].index] = targetValue;
    }

    return values;
  }

  public getData(): ModelData {
    return new ModelData(this.data);
  }
}

export default Model;
