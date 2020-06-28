export class Vector {
    constructor(x, y) {
        x !== undefined ? this.x = x : 0;
        y !== undefined ? this.y = y : 0;
    }

    summarizeWith(arg1, arg2) {//arg1 = vector || arg1 = x, arg2 = y
        if (arg1 instanceof Vector) {
            this.x += arg1.x;
            this.y += arg1.y;
        }
        else if (arg2 !== undefined) {
            this.x += arg1;
            this.y += arg2;
        }
        else throw new Error("Wrong args");
    }

    /* scalarMultiplyWith(vector) {
        if (arg1 instanceof Vector) {
            return this.x * vector.x + this.y * vector.y;
        }
        else throw new Error("Wrong args");
    } */
}