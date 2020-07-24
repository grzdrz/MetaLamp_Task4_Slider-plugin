import Event from "../../Events/Event";

import IModelData from "./Data/IModelData";
import ModelData from "./Data/ModelData";
import ModelDataEventArgs from "../../Events/ModelDataEventArgs";
import MathFunctions from "../../Helpers/MathFunctions";
import ViewDataEventArgs from "../../Events/ViewDataEventArgs";
import ViewData from "../Views/Data/ViewData";

class Model {
    private data: ModelData;

    public onGetViewData = new Event();

    public onStatesUpdate = new Event();

    constructor(data: ModelData) {
        this.data = data;
    }

    public initialize(): void {
        this.data.values = this.data.values.sort((a, b) => a - b);
        this.update(this.data);
    }

    public update(data: IModelData): void {
        if (data.id !== undefined) this.data.id = data.id;
        if (data.canPush !== undefined) this.data.canPush = data.canPush;
        if (data.minValue !== undefined) {
            this.data.minValue = this.validateMinValue(data.minValue, this.data.stepSize);
        }
        if (data.maxValue !== undefined) {
            this.data.maxValue = this.validateMaxValue(this.data.stepSize, data.maxValue);
        }
        if (data.stepSize !== undefined) {
            this.data.stepSize = data.stepSize;
            this.data.maxValue = this.validateMaxValue(data.stepSize, this.data.maxValue);
        }

        this.validateValues(data);
    }

    public getViewData(): ViewData {
        const eventArgs = new ViewDataEventArgs({});
        this.onGetViewData.invoke(eventArgs);
        if (!eventArgs.data) throw new Error("broken get view data");
        return <ViewData>eventArgs.data;
    }

    public getOptions(args: ModelDataEventArgs): void {
        args.data = new ModelData(this.data);
    }

    private validateValues(data: IModelData) {
        const wasSliderParametersChanged = data.stepSize !== undefined || data.maxValue !== undefined || data.minValue !== undefined;
        if (wasSliderParametersChanged) {
            if (data.values !== undefined) this.data.values = data.values;
            this.data.values = this.data.values.map((value) => this.validateGoingOutOfBounds(value));
        } else if (data.values !== undefined && data.values.length > 0) {
            // проверяем был ли сдвинут какой либо ползунок
            let changedValueIndex = -1;
            let deltaDirection = 0;
            data.values.forEach((e, i) => {
                if (e !== this.data.values[i]) changedValueIndex = i;
            });
            if (changedValueIndex !== -1) deltaDirection = data.values[changedValueIndex] - this.data.values[changedValueIndex];
            const wasHandleMove = (changedValueIndex !== -1 && deltaDirection !== 0);

            this.data.values = data.values;

            if (this.data.values.length > 1 && wasHandleMove) {
                if (deltaDirection > 0) { // протаскивание всех ползунков после текущего
                    this.data.values[changedValueIndex] = this.validateValue(this.data.values[changedValueIndex], changedValueIndex, this.data.canPush);
                    for (let i = changedValueIndex + 1; i < this.data.values.length; i += 1) {
                        this.data.values[i] = this.validateValue(this.data.values[i], i, !this.data.canPush);
                    }
                } else if (deltaDirection < 0) { // протаскивание всех ползунков до текущего
                    this.data.values[changedValueIndex] = this.validateValue(this.data.values[changedValueIndex], changedValueIndex, this.data.canPush);
                    for (let i = changedValueIndex - 1; i >= 0; i -= 1) {
                        this.data.values[i] = this.validateValue(this.data.values[i], i, !this.data.canPush);
                    }
                }
            } else if (this.data.values.length === 1) {
                this.data.values[0] = this.validateValue(this.data.values[0], 0, false);
            }

            this.valuesChanged();
        }
    }

    private valuesChanged(): void {
        const viewData = this.getViewData();
        const { filledStrips } = viewData;
        const newFilledStrips = new Array<boolean>();
        for (let i = 0; i < this.data.values.length + 1; i += 1) {
            if (i < filledStrips.length) {
                newFilledStrips.push(filledStrips[i]);
            } else {
                newFilledStrips.push(false);
            }
        }
        this.onStatesUpdate.invoke(new ViewDataEventArgs({ filledStrips: newFilledStrips }));
    }

    private validateValue(value: number, countNumber: number, canPush: boolean): number {
        const newTargetInputValue = this.calculateNearestPositionForHandle(value);

        const { values } = this.data;

        if (newTargetInputValue > values[countNumber + 1] && !canPush) return values[countNumber + 1];
        if (newTargetInputValue < values[countNumber - 1] && !canPush) return values[countNumber - 1];
        return this.validateGoingOutOfBounds(newTargetInputValue);
    }

    private validateGoingOutOfBounds(value: number): number {
        const { minValue, maxValue } = this.data;
        if (value < minValue) return minValue;
        if (value > maxValue) return maxValue;
        return value;
    }

    private validateMaxValue(stepSize: number, maxValue: number): number {
        const dMaxMin = maxValue - this.data.minValue;
        if (dMaxMin <= 0) return this.data.minValue + stepSize;

        const valueOfOneStep = dMaxMin / stepSize;
        const fraction = MathFunctions.getFractionOfNumber(valueOfOneStep);

        if (fraction === 0) return maxValue;

        const roundedValueOfOneStep = Math.round(valueOfOneStep);
        return stepSize * roundedValueOfOneStep + this.data.minValue;
    }

    private validateMinValue(minValue: number, stepSize: number): number {
        const dMaxMin = this.data.maxValue - minValue;
        if (dMaxMin <= 0) return this.data.maxValue - stepSize;

        const valueOfOneStep = (this.data.maxValue - minValue) / stepSize;
        const fraction = MathFunctions.getFractionOfNumber(valueOfOneStep);

        if (fraction === 0) return minValue;

        const roundedValueOfOneStep = Math.round(valueOfOneStep);
        return this.data.maxValue - stepSize * roundedValueOfOneStep;
    }

    // подменяем текущее значение инпута на число к которому ближе всего текущее значение курсора
    // т.е. например шаг 10, значение 78 -> на выходе получаем 80,
    // или например  шаг 10, значение 73 -> на выходе получаем 70
    private calculateNearestPositionForHandle(value: number): number {
        let absoluteValue;
        let resultValue;
        const { minValue, stepSize } = this.data;
        if (minValue < 0) {
            absoluteValue = (value + Math.abs(minValue)) / stepSize;
            const roundedAbsoluteValue = Math.round(absoluteValue);
            resultValue = roundedAbsoluteValue * stepSize - Math.abs(minValue);
        } else {
            absoluteValue = (value - Math.abs(minValue)) / stepSize;
            const roundedAbsoluteValue = Math.round(absoluteValue);
            resultValue = roundedAbsoluteValue * stepSize + Math.abs(minValue);
        }
        return MathFunctions.cutOffJunkValuesFromFraction(resultValue, stepSize);
    }
}

export default Model;
