import Event from "../../Events/Event";

import IModelData from "./IModelData";
import ModelData from "./ModelData";
import ModelDataEventArgs from "../../Events/ModelDataEventArgs";
import MathFunctions from "../../Helpers/MathFunctions";
import ViewDataEventArgs from "../../Events/ViewDataEventArgs";
import ViewData from "../Views/ViewData";

class Model {
    private data: ModelData;

    public onGetViewData: Event;

    public onValuesChange: Event;

    constructor(data: ModelData) {
        this.data = data;

        this.onGetViewData = new Event();
        this.onValuesChange = new Event();
    }

    public updateData(data: IModelData): void {
        this.data.id = (data.id !== undefined ? data.id : this.data.id);
        this.data.minValue = (data.minValue !== undefined ? data.minValue : this.data.minValue);
        this.data.maxValue = (data.maxValue !== undefined ? data.maxValue : this.data.maxValue);
        this.data.stepSize = (data.stepSize !== undefined ? data.stepSize : this.data.stepSize);
        this.data.canPush = (data.canPush !== undefined ? data.canPush : this.data.canPush);
        this.data.values = (data.values !== undefined ? data.values : this.data.values);

        if (data.values !== undefined) {
            const viewData = this.getViewData();
            const filledStrips = viewData.filledStrips.map((e) => e);
            const newFilledStrips = new Array<boolean>();
            for (let i = 0; i < this.data.values.length + 1; i += 1) {
                if (i < filledStrips.length) {
                    newFilledStrips.push(filledStrips[i]);
                } else {
                    newFilledStrips.push(false);
                }
            }
            this.onValuesChange.invoke(new ViewDataEventArgs({ filledStrips: newFilledStrips }));
        }
    }

    public getViewData(): ViewData {
        const eventArgs = new ViewDataEventArgs({});
        this.onGetViewData.invoke(eventArgs);
        if (!eventArgs.data) throw new Error("broken get model data");
        return <ViewData>eventArgs.data;
    }

    public getOptions(args: ModelDataEventArgs): void {
        args.data = new ModelData(this.data);
    }

    public update(data: IModelData): void {
        let changedValueIndex = -1;
        let deltaDirection = 0; // направление смещения значения
        if (data.values) { // значение, для которого нет соответствующей пары является значением текущего ползунка
            data.values.forEach((e, i) => {
                if (e !== this.data.values[i]) changedValueIndex = i;
            });
            deltaDirection = data.values[changedValueIndex] - this.data.values[changedValueIndex];
        }

        this./* data. */updateData(data);

        if (data.stepSize !== undefined) {
            this.data.maxValue = this.validateMaxValue(data.stepSize, this.data.maxValue);
        }
        if (data.maxValue !== undefined) {
            this.data.maxValue = this.validateMaxValue(this.data.stepSize, data.maxValue);
        }
        if (data.minValue !== undefined) {
            this.data.minValue = this.validateMinValue(data.minValue, this.data.stepSize);
        }

        const wasSliderParametersChange = data.stepSize !== undefined || data.maxValue !== undefined || data.minValue !== undefined || data.values !== undefined;
        const wasHandleMove = (changedValueIndex !== -1 && deltaDirection !== 0);

        if (this.data.values.length > 1 && wasHandleMove) {
            // протаскивание всех ползунков после/до текущего
            if (deltaDirection > 0) {
                this.data.values[changedValueIndex] = this.validateValue(this.data.values[changedValueIndex], changedValueIndex, this.data.canPush);
                for (let i = changedValueIndex + 1; i < this.data.values.length; i += 1) {
                    this.data.values[i] = this.validateValue(this.data.values[i], i, !this.data.canPush);
                }
            } else if (deltaDirection < 0) {
                this.data.values[changedValueIndex] = this.validateValue(this.data.values[changedValueIndex], changedValueIndex, this.data.canPush);
                for (let i = changedValueIndex - 1; i >= 0; i -= 1) {
                    this.data.values[i] = this.validateValue(this.data.values[i], i, !this.data.canPush);
                }
            }
        } else if (wasSliderParametersChange) {
            for (let i = 0; i < this.data.values.length; i += 1) {
                this.data.values[i] = this.validateValue(this.data.values[i], i, false);
            }
        }
    }

    private validateMaxValue(stepSize: number, maxValue: number): number {
        const test2 = (maxValue - this.data.minValue) / stepSize;
        const test1 = MathFunctions.getFractionOfNumber(test2);

        if (test1 === 0) return maxValue;

        const test3 = Math.round(test2);
        return stepSize * test3 + this.data.minValue;
    }

    private validateMinValue(minValue: number, stepSize: number): number {
        const test2 = (this.data.maxValue - minValue) / stepSize;
        const test1 = MathFunctions.getFractionOfNumber(test2);

        if (test1 === 0) return minValue;

        const test3 = Math.round(test2);
        return this.data.maxValue - stepSize * test3;
    }

    private validateValue(value: number, countNumber: number, canPush: boolean): number {
        const newTargetInputValue = this.calculateNearestPositionForHandle(value);

        const {
            minValue, maxValue,
        } = this.data;
        const values = this.data.values.map((e) => e);

        if (newTargetInputValue > values[countNumber + 1] && !canPush) return values[countNumber + 1];
        if (newTargetInputValue < values[countNumber - 1] && !canPush) return values[countNumber - 1];
        if (newTargetInputValue < minValue) return minValue;
        if (newTargetInputValue > maxValue) return maxValue;

        return newTargetInputValue;
    }

    // подменяем текущее значение инпута на число к которому ближе всего текущее значение курсора
    // т.е. например шаг 10, значение 78 -> на выходе получаем 80,
    // или например  шаг 10, значение 73 -> на выходе получаем 70
    private calculateNearestPositionForHandle(value: number): number {
        let temp1;
        let temp3;
        const { minValue, stepSize } = this.data;
        if (minValue < 0) {
            temp1 = (value + Math.abs(minValue)) / stepSize;
            const temp2 = Math.round(temp1);
            temp3 = temp2 * stepSize - Math.abs(minValue);
        } else {
            temp1 = (value - Math.abs(minValue)) / stepSize;
            const temp2 = Math.round(temp1);
            temp3 = temp2 * stepSize + Math.abs(minValue);
        }
        return MathFunctions.cutOffJunkValuesFromFraction(temp3, stepSize);
    }
}

export default Model;
