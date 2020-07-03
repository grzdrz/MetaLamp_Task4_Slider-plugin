export class Vector {
    constructor(x, y) {
        if (!x && x !== 0)
            throw new Error("wrong x value in constructor");
        if (!y && y !== 0)
            throw new Error("wrong y value in constructor");
        this._x = (x !== undefined ? x : 0);
        this._y = (y !== undefined ? y : 0);
    }

    get width() {
        return this._x;
    }
    set width(value) {
        this._x = (!value && value !== 0 ? this._x : value);
    }

    get height() {
        return this._y;
    }
    set height(value) {
        this._y = (!value && value !== 0 ? this._y : value);
    }

    get x() {
        return this._x;
    }
    set x(value) {
        this._x = (!value && value !== 0 ? this._x : value);
    }

    get y() {
        return this._y;
    }
    set y(value) {
        this._y = (!value && value !== 0 ? this._y : value);
    }

    static sumWith(vector) {
        if (vector instanceof Vector) {
            this._x += (vector.x !== undefined ? vector.x : this._x);
            this._y += (vector.y !== undefined ? vector.y : this._y);
        }
        else throw new Error("not a vector");
    }

    static sum(vector1, vector2) {
        if ((!vector1.x && vector1.x !== 0) || (!vector1.y && vector1.y !== 0))
            throw new Error("wrong vector1");
        else if ((!vector2.x && vector2.x !== 0) || (!vector2.y && vector2.y !== 0))
            throw new Error("wrong vector2");

        return new Vector(
            vector1.x + vector2.x,
            vector1.y + vector2.y
        );
    }

    multiplyByNumber(number) {
        return new Vector(
            this._x * number,
            this._y * number
        );
    }

    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }
}