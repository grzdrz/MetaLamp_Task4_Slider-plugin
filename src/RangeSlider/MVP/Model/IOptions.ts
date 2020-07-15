interface IOptions {
    id?: number;

    sliderStripThickness?: number,
    handleWidth?: number,
    handleHeight?: number,
    minValue?: number,
    maxValue?: number,
    borderThickness?: number,
    firstValue?: number,
    lastValue?: number,
    stepSize?: number,
    hasTwoSlider?: boolean,
    isInterval?: boolean,
    maxSegmentsCount?: number,
    scaleFontSize?: number,
    angle?: number
}

export default IOptions;
