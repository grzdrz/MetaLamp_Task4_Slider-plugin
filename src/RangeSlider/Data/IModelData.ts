interface IModelData {
  id?: number;
  minValue?: number,
  maxValue?: number,
  values?: number[],
  stepSize?: number,
  canPush?: boolean,
}

export default IModelData;
