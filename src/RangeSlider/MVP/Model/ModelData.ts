import IModelData from "./IModelData";

class ModelData implements IModelData {
    public id = 0;

    public minValue = -100;

    public maxValue = 100;

    public values = [0, 0];
    /* public firstValue = 0;

    public lastValue = 50; */

    public stepSize = 10;

    public hasTwoSlider = false;

    public canPush = true;

    constructor(data: IModelData) {
        this.update(data);
    }

    get deltaMaxMin(): number {
        return this.maxValue - this.minValue;
    }

    update(data: IModelData): void {
        this.id = (data.id !== undefined ? data.id : this.id);
        this.minValue = (data.minValue !== undefined ? data.minValue : this.minValue);
        this.maxValue = (data.maxValue !== undefined ? data.maxValue : this.maxValue);
        // this.firstValue = (data.firstValue !== undefined ? data.firstValue : this.firstValue);
        // this.lastValue = (data.lastValue !== undefined ? data.lastValue : this.lastValue);
        this.stepSize = (data.stepSize !== undefined ? data.stepSize : this.stepSize);
        this.hasTwoSlider = (data.hasTwoSlider !== undefined ? data.hasTwoSlider : this.hasTwoSlider);
        this.canPush = (data.canPush !== undefined ? data.canPush : this.canPush);

        this.values = (data.values !== undefined ? data.values : this.values);
    }
}

export default ModelData;
