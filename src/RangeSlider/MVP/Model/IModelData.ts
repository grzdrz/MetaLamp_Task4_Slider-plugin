interface IModelData {
    id?: number;
    minValue?: number,
    maxValue?: number,
    values?: number[],
    stepSize?: number,
    hasTwoSlider?: boolean,
    canPush?: boolean,
}

export default IModelData;
