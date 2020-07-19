import IModelData from "./IModelData";

class ModelData implements IModelData {
    public id = 0;

    public minValue = -100;

    public maxValue = 100;

    public values = [0, 0];

    public stepSize = 10;

    public canPush = true;

    constructor(data: IModelData) {
        this.update(data);
    }

    get deltaMaxMin(): number {
        return this.maxValue - this.minValue;
    }

    private update(data: IModelData): void { // /////////////////////
        this.id = (data.id !== undefined ? data.id : this.id);
        this.minValue = (data.minValue !== undefined ? data.minValue : this.minValue);
        this.maxValue = (data.maxValue !== undefined ? data.maxValue : this.maxValue);
        this.stepSize = (data.stepSize !== undefined ? data.stepSize : this.stepSize);
        this.canPush = (data.canPush !== undefined ? data.canPush : this.canPush);
        this.values = (data.values !== undefined ? data.values : this.values);
    }
}

export default ModelData;
