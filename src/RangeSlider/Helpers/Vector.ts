class Vector {

    private _x: number = 0;
    private _y: number = 0;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get width(): number {
        return this._x;
    }
    set width(value: number) {
        this._x = value;
    }

    get height(): number {
        return this._y;
    }
    set height(value: number) {
        this._y = value;
    }

    get x(): number {
        return this._x;
    }
    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }
    set y(value: number) {
        this._y = value;
    }


    sum(vector: Vector): Vector {
        return new Vector(this._x + vector.x, this._y + vector.y);
    }
    sumNumber(number: number): Vector {
        return new Vector(this._x + number, this._y + number);
    }

    subtract(vector: Vector): Vector {
        return new Vector(this._x - vector.x, this._y - vector.y);
    }

    multiplyByNumber(number: number): Vector {
        return new Vector(this._x * number, this._y * number);
    }

    calculateScalarProduct(vector: Vector) {
        return this._x * vector.x + this._y * vector.y;
    }

    ///считает длину проекции текущего вектора на целевой вектор
    calculateVectorProjectionOnTargetVector(targetVector: Vector): number {
        return this.calculateScalarProduct(targetVector) / targetVector.length;
    }

    get length(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    static calculateVector(length: number, angle: number): Vector {
        return new Vector(length * Math.cos(angle), length * Math.sin(angle));
    }
}

export { Vector };