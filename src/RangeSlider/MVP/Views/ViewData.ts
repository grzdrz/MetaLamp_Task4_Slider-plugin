import IViewData from "./IViewData";

class ViewData implements IViewData {
    public sliderLength = 0;

    public sliderStripThickness = 10;

    public handleWidth = 15;

    public handleHeight = 15;

    public borderThickness = 5;

    public maxSegmentsCount = 10;

    public scaleFontSize = 20;

    public angle = 0;

    public filledStrips = [true];

    public hasScale = true;

    constructor(data: IViewData) {
        this.update(data);
    }

    update(data: IViewData): void {
        this.sliderStripThickness = (data.sliderStripThickness !== undefined ? data.sliderStripThickness : this.sliderStripThickness);
        this.handleWidth = (data.handleWidth !== undefined ? data.handleWidth : this.handleWidth);
        this.handleHeight = (data.handleHeight !== undefined ? data.handleHeight : this.handleHeight);
        this.borderThickness = (data.borderThickness !== undefined ? data.borderThickness : this.borderThickness);
        this.maxSegmentsCount = (data.maxSegmentsCount !== undefined ? data.maxSegmentsCount : this.maxSegmentsCount);
        this.scaleFontSize = (data.scaleFontSize !== undefined ? data.scaleFontSize : this.scaleFontSize);
        this.angle = (data.angle !== undefined ? data.angle : this.angle);
        this.filledStrips = (data.filledStrips !== undefined ? data.filledStrips : this.filledStrips);
        this.hasScale = (data.hasScale !== undefined ? data.hasScale : this.hasScale);
    }

    public get angleInRad(): number {
        return this.angle * (Math.PI / 180);
    }
}

export default ViewData;
