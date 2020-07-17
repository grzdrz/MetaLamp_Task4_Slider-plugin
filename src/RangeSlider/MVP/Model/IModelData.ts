interface IModelData {
    id?: number;
    minValue?: number,
    maxValue?: number,
    values?: number[],
    /* firstValue?: number,
    lastValue?: number, */
    stepSize?: number,
    hasTwoSlider?: boolean,
    canPush?: boolean,
}

export default IModelData;
