import { Options, IOptions } from "./Options";
import { Event } from "../../Events/Event";
import { OptionsEventArgs } from "../../Events/EventArgs";
import { MathFunctions } from "../../Helpers/MathFunctions";
import { Vector } from "../../Helpers/Vector";

class Model {
    private _options: Options;

    constructor(options: Options) {
        this._options = options;
    }

    getOptions(args: OptionsEventArgs): void {
        args.options = new Options(this._options);
    }

    updateOptions(options: IOptions): void {
        if (options.firstValue) options.firstValue = this.validateValue(options.firstValue, 1);
        if (options.lastValue) options.lastValue = this.validateValue(options.lastValue, 2);
        /* if (options.stepSize) options.stepSize */

        this._options.update(options);
    }

    validateValue(value: number, countNumber: number): number{
        let newTargetInputValue = this._calculateNearestPositionForHandle(value);

        let minValue = this._options.minValue;
        let maxValue = this._options.maxValue;
        let stepSize = this._options.stepSize;
        let firstValue = this._options.firstValue;
        let lastValue = this._options.lastValue;
        let hasTwoSlider = this._options.hasTwoSlider;

        if (countNumber === 1 && newTargetInputValue !== firstValue) {
            if (newTargetInputValue < minValue)
                newTargetInputValue = minValue;
            else if (newTargetInputValue > lastValue && hasTwoSlider)
                newTargetInputValue = lastValue;
            else if (newTargetInputValue > maxValue)
                newTargetInputValue = maxValue;            
            else
                newTargetInputValue = newTargetInputValue;
        }
        else if (countNumber === 2 && newTargetInputValue !== lastValue && hasTwoSlider) {
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
    _calculateNearestPositionForHandle(value: number/* , stepSize: number, minValue: number */): number {
        let temp1;
        let temp3;
        let minValue = this._options.minValue; 
        let stepSize = this._options.stepSize; 
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

export { Model };