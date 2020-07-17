import Event from "../../Events/Event";

import IModelData from "./IModelData";
import ModelData from "./ModelData";
import OptionsEventArgs from "../../Events/OptionsEventArgs";
import MathFunctions from "../../Helpers/MathFunctions";
import ViewDataEventArgs from "../../Events/ViewDataEventArgs";
import ViewData from "../Views/ViewData";

class Model {
    private data: ModelData;

    public onGetViewData: Event;

    constructor(data: ModelData) {
        this.data = data;

        this.onGetViewData = new Event();
    }

    getViewData(): ViewData {
        const eventArgs = new ViewDataEventArgs();
        this.onGetViewData.invoke(eventArgs);
        if (!eventArgs.data) throw new Error("broken get model data");
        return <ViewData>eventArgs.data;
    }

    getOptions(args: OptionsEventArgs): void {
        args.data = new ModelData(this.data);
    }

    updateOptions(data: IModelData): void {
        this.data.update(data);

        if (data.stepSize !== undefined) {
            this.data.maxValue = this.validateMaxValue(data.stepSize, this.data.maxValue);
        }
        if (data.maxValue !== undefined) {
            this.data.maxValue = this.validateMaxValue(this.data.stepSize, data.maxValue);
        }
        if (data.minValue !== undefined) {
            this.data.minValue = this.validateMinValue(data.minValue, this.data.stepSize);
        }

        const neededValidateValue = data.stepSize !== undefined || data.maxValue !== undefined || data.minValue !== undefined;
        const neededValidateFirstValue = data.firstValue !== undefined || neededValidateValue/*  || data.hasTwoSlider !== undefined */;
        const neededValidateLastValue = data.lastValue !== undefined || neededValidateValue;

        if (this.data.hasTwoSlider) {
            if (this.data.canPush && neededValidateFirstValue) {
                this.data.firstValue = this.validateValue(this.data.firstValue, 1, this.data.canPush);
                this.data.lastValue = this.validateValue(this.data.lastValue, 2, !this.data.canPush);
            } else if (this.data.canPush && neededValidateLastValue) {
                this.data.lastValue = this.validateValue(this.data.lastValue, 2, this.data.canPush);
                this.data.firstValue = this.validateValue(this.data.firstValue, 1, !this.data.canPush);
            } else {
                if (neededValidateFirstValue) {
                    this.data.firstValue = this.validateValue(this.data.firstValue, 1, this.data.canPush);
                }
                if (neededValidateLastValue) {
                    this.data.lastValue = this.validateValue(this.data.lastValue, 2, this.data.canPush);
                }
            }
        } else {
            if (neededValidateFirstValue) {
                this.data.firstValue = this.validateValue(this.data.firstValue, 1, true);
                this.data.lastValue = this.validateValue(this.data.lastValue, 2, false);
            }
            if (neededValidateLastValue) {
                this.data.lastValue = this.validateValue(this.data.lastValue, 2, true);
                this.data.firstValue = this.validateValue(this.data.firstValue, 1, false);
            }
        }

        /* if (neededValidateFirstValue || (neededValidateLastValue && this.data.canPush)) {
            this.data.firstValue = this.validateValue(this.data.firstValue, 1);
        }
        if (neededValidateLastValue || (neededValidateFirstValue && this.data.canPush)) {
            this.data.lastValue = this.validateValue(this.data.lastValue, 2);
        } */
    }

    validateMaxValue(stepSize: number, maxValue: number): number {
        const test2 = (maxValue - this.data.minValue) / stepSize;
        const test1 = MathFunctions.getFractionOfNumber(test2);

        if (test1 === 0) return maxValue;

        const test3 = Math.round(test2);
        return stepSize * test3 + this.data.minValue;
    }

    validateMinValue(minValue: number, stepSize: number): number {
        const test2 = (this.data.maxValue - minValue) / stepSize;
        const test1 = MathFunctions.getFractionOfNumber(test2);

        if (test1 === 0) return minValue;

        const test3 = Math.round(test2);
        return this.data.maxValue - stepSize * test3;
    }

    validateValue(value: number, countNumber: number, canPush: boolean): number {
        let newTargetInputValue = this.calculateNearestPositionForHandle(value);

        const {
            minValue, maxValue, firstValue, lastValue, hasTwoSlider,
        } = this.data;

        if (countNumber === 1) {
            if (newTargetInputValue > lastValue && hasTwoSlider && /* !this.data. */ !canPush) newTargetInputValue = lastValue;
            else if (newTargetInputValue < minValue) newTargetInputValue = minValue;
            else if (newTargetInputValue > maxValue) newTargetInputValue = maxValue;
        } else if (countNumber === 2) {
            if (newTargetInputValue < firstValue && /* !this.data. */ !canPush) newTargetInputValue = firstValue;
            else if (newTargetInputValue < minValue) newTargetInputValue = minValue;
            else if (newTargetInputValue > maxValue) newTargetInputValue = maxValue;
        }

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
