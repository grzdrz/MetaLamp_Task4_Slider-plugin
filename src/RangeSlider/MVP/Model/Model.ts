import IOptions from "./IOptions";
import Options from "./Options";
import OptionsEventArgs from "../../Events/OptionsEventArgs";
import MathFunctions from "../../Helpers/MathFunctions";

class Model {
    private options: Options;

    constructor(options: Options) {
        this.options = options;
    }

    getOptions(args: OptionsEventArgs): void {
        args.options = new Options(this.options);
    }

    updateOptions(options: IOptions): void {
        this.options.update(options);

        if (options.stepSize !== undefined) {
            this.options.maxValue = this.validateMaxValue(options.stepSize, this.options.maxValue);
        }
        if (options.maxValue !== undefined) {
            this.options.maxValue = this.validateMaxValue(this.options.stepSize, options.maxValue);
        }
        if (options.minValue !== undefined) {
            this.options.minValue = this.validateMinValue(options.minValue, this.options.stepSize);
        }

        let neededValidateValue =
            options.stepSize !== undefined ||
            options.maxValue !== undefined ||
            options.minValue !== undefined;
        let neededValidateFirstValue = options.firstValue !== undefined || neededValidateValue || options.hasTwoSlider !== undefined;
        let neededValidateLastValue = options.lastValue !== undefined || neededValidateValue;
        if (neededValidateFirstValue) {
            this.options.firstValue = this.validateValue(this.options.firstValue, 1);
        }
        if (neededValidateLastValue) {
            this.options.lastValue = this.validateValue(this.options.lastValue, 2);
        }
    }

    validateMaxValue(stepSize: number, maxValue: number): number {
        let test2 = (maxValue - this.options.minValue) / stepSize;
        let test1 = MathFunctions.getFractionOfNumber(test2);
        if (test1 === 0) return maxValue;
        else {
            let test3 = Math.round(test2);
            return stepSize * test3 + this.options.minValue;
        }
    }

    validateMinValue(minValue: number, stepSize: number): number {
        let test2 = (this.options.maxValue - minValue) / stepSize;
        let test1 = MathFunctions.getFractionOfNumber(test2);
        if (test1 === 0) return minValue;
        else {
            let test3 = Math.round(test2);
            return this.options.maxValue - stepSize * test3;
        }
    }

    validateValue(value: number, countNumber: number): number {
        let newTargetInputValue = this.calculateNearestPositionForHandle(value);

        const minValue = this.options.minValue;
        const maxValue = this.options.maxValue;
        const stepSize = this.options.stepSize;
        const firstValue = this.options.firstValue;
        const lastValue = this.options.lastValue;
        const hasTwoSlider = this.options.hasTwoSlider;

        if (countNumber === 1) {
            if (newTargetInputValue < minValue)
                newTargetInputValue = minValue;
            else if (newTargetInputValue > lastValue && hasTwoSlider)
                newTargetInputValue = lastValue;
            else if (newTargetInputValue > maxValue)
                newTargetInputValue = maxValue;
            else
                newTargetInputValue = newTargetInputValue;
        }
        else if (countNumber === 2) {
            if (newTargetInputValue > maxValue)
                newTargetInputValue = maxValue;
            else if (newTargetInputValue < firstValue)
                newTargetInputValue = firstValue;
            else
                newTargetInputValue = newTargetInputValue;
        }

        return newTargetInputValue;
    }

    // подменяем текущее значение инпута на число к которому ближе всего текущее значение курсора
    // т.е. например шаг 10, значение 78 -> на выходе получаем 80, 
    // или например  шаг 10, значение 73 -> на выходе получаем 70
    private calculateNearestPositionForHandle(value: number): number {
        let temp1;
        let temp3;
        let minValue = this.options.minValue;
        let stepSize = this.options.stepSize;
        if (minValue < 0) {
            temp1 = (value + Math.abs(minValue)) / stepSize;
            let temp2 = Math.round(temp1);
            temp3 = temp2 * stepSize - Math.abs(minValue);
        }
        else {
            temp1 = (value - Math.abs(minValue)) / stepSize;
            let temp2 = Math.round(temp1);
            temp3 = temp2 * stepSize + Math.abs(minValue);
        }
        return MathFunctions.cutOffJunkValuesFromFraction(temp3, stepSize);
    }
}

export default Model;