export class Options {
    constructor(options) {
        this.id = 0;

        this.sliderStripLength = (options.sliderStripLength !== undefined ? options.sliderStripLength : 500);
        this.sliderStripThickness = (options.sliderStripThickness !== undefined ? options.sliderStripThickness : 10);
        this.handleWidth = (options.handleWidth !== undefined ? options.handleWidth : 15);
        this.handleHeight = (options.handleHeight !== undefined ? options.handleHeight : 15);
        this.minValue = (options.minValue !== undefined ? options.minValue : -100);
        this.maxValue = (options.maxValue !== undefined ? options.maxValue : 100);
        this.borderThickness = (options.borderThickness !== undefined ? options.borderThickness : 5);
        this.firstValue = (options.firstValue !== undefined ? options.firstValue : 0);
        this.lastValue = (options.lastValue !== undefined ? options.lastValue : 50);
        this.stepSize = (options.stepSize !== undefined ? options.stepSize : 10);
        this.hasTwoSlider = (options.hasTwoSlider !== undefined ? options.hasTwoSlider : false);
        this.isInterval = (options.isInterval !== undefined ? options.isInterval : true);
        this.maxSegmentsCount = (options.maxSegmentsCount !== undefined ? options.maxSegmentsCount : 10);
        this.scaleFontSize = (options.scaleFontSize !== undefined ? options.scaleFontSize : 20);
        this.angle = (options.angle !== undefined ? options.angle : 0);
    }

    get angleInRad() {
        return this.angle * (Math.PI / 180);
    }
}