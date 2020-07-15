import IOptions from "./IOptions";

class Options implements IOptions {
    public id: number = 0;

    public sliderStripThickness: number = 10;
    public handleWidth: number = 15;
    public handleHeight: number = 15;
    public minValue: number = -100;
    public maxValue: number = 100;
    public borderThickness: number = 5;
    public firstValue: number = 0;
    public lastValue: number = 50;
    public stepSize: number = 10;
    public hasTwoSlider: boolean = false;
    public isInterval: boolean = true;
    public maxSegmentsCount: number = 10;
    public scaleFontSize: number = 20;
    public angle: number = 0;

    
    public originalSliderStripLength: number = 500;

    constructor(options: IOptions) {
        this.update(options);
    }

    update(options: IOptions): void {
        this.id = (options.id !== undefined ? options.id : this.id);

        this.sliderStripThickness = (options.sliderStripThickness !== undefined ? options.sliderStripThickness : this.sliderStripThickness);
        this.handleWidth = (options.handleWidth !== undefined ? options.handleWidth : this.handleWidth);
        this.handleHeight = (options.handleHeight !== undefined ? options.handleHeight : this.handleHeight);
        this.minValue = (options.minValue !== undefined ? options.minValue : this.minValue);
        this.maxValue = (options.maxValue !== undefined ? options.maxValue : this.maxValue);
        this.borderThickness = (options.borderThickness !== undefined ? options.borderThickness : this.borderThickness);
        this.firstValue = (options.firstValue !== undefined ? options.firstValue : this.firstValue);
        this.lastValue = (options.lastValue !== undefined ? options.lastValue : this.lastValue);
        this.stepSize = (options.stepSize !== undefined ? options.stepSize : this.stepSize);
        this.hasTwoSlider = (options.hasTwoSlider !== undefined ? options.hasTwoSlider : this.hasTwoSlider);
        this.isInterval = (options.isInterval !== undefined ? options.isInterval : this.isInterval);
        this.maxSegmentsCount = (options.maxSegmentsCount !== undefined ? options.maxSegmentsCount : this.maxSegmentsCount);
        this.scaleFontSize = (options.scaleFontSize !== undefined ? options.scaleFontSize : this.scaleFontSize);
        this.angle = (options.angle !== undefined ? options.angle : this.angle);
    }

    get angleInRad(): number {
        return this.angle * (Math.PI / 180);
    }

    get deltaMaxMin(): number {
        return this.maxValue - this.minValue;
    }
}

export default Options;
