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

  constructor(data: ModelData) {
    this.data = data;
    this.validator = new ModelDataValidator(this);
  }

  public initialize(): void {
    this.updateData(this.data);
  }

  public updateData(data: IModelData): void {
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

    this.onUpdated.invoke(new EventArgs(this.getData()));
  }

  public valuesChange = (handleData: IHandleData): void => {
    const changedValue = this.calculateProportionalValue(handleData);
  };

  public clickByScale = (targetValue: number) => {
    const values = this.setClosestHandle(targetValue);
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
