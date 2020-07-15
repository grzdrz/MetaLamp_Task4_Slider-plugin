import IOptions from "./IOptions";

class Options implements IOptions {
    public id = 0;

    //public sliderStripThickness = 10;

    //public handleWidth = 15;

    //public handleHeight = 15;

    public minValue = -100;

    public maxValue = 100;

    //public borderThickness = 5;

    public firstValue = 0;

    public lastValue = 50;

    public stepSize = 10;

    public hasTwoSlider = false;

    //public maxSegmentsCount = 10;

    //public scaleFontSize = 20;

    //public angle = 0;

    constructor(options: IOptions) {
        this.update(options);
    }

    update(options: IOptions): void {
        this.id = (options.id !== undefined ? options.id : this.id);

        /* this.sliderStripThickness = (options.sliderStripThickness !== undefined ? options.sliderStripThickness : this.sliderStripThickness);
        this.handleWidth = (options.handleWidth !== undefined ? options.handleWidth : this.handleWidth);
        this.handleHeight = (options.handleHeight !== undefined ? options.handleHeight : this.handleHeight); */
        this.minValue = (options.minValue !== undefined ? options.minValue : this.minValue);
        this.maxValue = (options.maxValue !== undefined ? options.maxValue : this.maxValue);
        //this.borderThickness = (options.borderThickness !== undefined ? options.borderThickness : this.borderThickness);
        this.firstValue = (options.firstValue !== undefined ? options.firstValue : this.firstValue);
        this.lastValue = (options.lastValue !== undefined ? options.lastValue : this.lastValue);
        this.stepSize = (options.stepSize !== undefined ? options.stepSize : this.stepSize);
        this.hasTwoSlider = (options.hasTwoSlider !== undefined ? options.hasTwoSlider : this.hasTwoSlider);
        /* this.maxSegmentsCount = (options.maxSegmentsCount !== undefined ? options.maxSegmentsCount : this.maxSegmentsCount);
        this.scaleFontSize = (options.scaleFontSize !== undefined ? options.scaleFontSize : this.scaleFontSize);
        this.angle = (options.angle !== undefined ? options.angle : this.angle); */
    }

    /* get angleInRad(): number {
        return this.angle * (Math.PI / 180);
    } */

    get deltaMaxMin(): number {
        return this.maxValue - this.minValue;
    }
}

export default Options;
