/* eslint-disable no-useless-escape */
import Vector from './Vector';

class MathFunctions {
  static cutOffJunkValuesFromFraction(value: number, stepSize: number): number {
    let stringOfNumber = '';
    if (this.hasEInNumber(stepSize)) {
      stringOfNumber = this.getStringOfNumberWithoutE(stepSize);
    } else stringOfNumber = stepSize.toString();

    const fractionalPart = stringOfNumber.split('.')[1];

    if (fractionalPart) {
      const countOfNumbers: number = fractionalPart.length;
      return Number.parseFloat(value.toFixed(countOfNumbers));
    }
    return value;
  }

  static getStringOfNumberWithoutE(number: number): string {
    const numberParts = number.toString().split(/[eE]/);
    if (numberParts.length === 1) return numberParts[0];

    let currentNumberString = '';
    const sign = number < 0 ? '-' : '';
    const leftNumberPart = numberParts[0].replace('.', '');
    let valueOfE = Number(numberParts[1]) + 1;

    if (valueOfE < 0) {
      currentNumberString = `${sign}0.`;
      while (valueOfE) {
        currentNumberString = `${currentNumberString}0`;
        valueOfE += 1;
      }
      return currentNumberString + leftNumberPart.replace(/^\-/, '');
    }
    valueOfE -= leftNumberPart.length;
    while (valueOfE) {
      currentNumberString = `${currentNumberString}0`;
      valueOfE -= 1;
    }
    return leftNumberPart + currentNumberString;
  }

  static hasEInNumber(number: number): boolean {
    const splitByE: string[] = number.toString().split('e');
    return splitByE.length === 2;
  }

  static getFractionOfNumber(number: number): number {
    const splitedNumber = number.toString().split('.');
    let leftNumberPart;
    if (splitedNumber.length > 1) {
      leftNumberPart = `0.${splitedNumber[1]}`;
      return Number.parseFloat(leftNumberPart);
    }
    return 0;
  }

  static calculateEllipseSurfacePointCoordinate(width: number, height: number, angleInRad: number): Vector {
    const t = Math.atan2(width * Math.sin(angleInRad), height * Math.cos(angleInRad));
    const x = width * Math.cos(t);
    const y = height * Math.sin(t);
    return new Vector(x, y);
  }
}

export default MathFunctions;
