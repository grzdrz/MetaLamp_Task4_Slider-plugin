interface IModelData {
  minValue?: number,
  maxValue?: number,
  values?: number[],
  stepSize?: number,
  canPush?: boolean,
  filledStrips?: boolean[],
}

export default IModelData;
