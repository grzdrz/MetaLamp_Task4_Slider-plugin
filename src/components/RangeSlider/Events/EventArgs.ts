
import { Options, IOptions } from "../MVP/Model/Options";

class EventArgs {
    /* eventTarget: Object;

    constructor(eventTarget: Object){

    } */
}

class OptionsEventArgs extends EventArgs {
    public options: Options | undefined;
}

class ValuesChangeEventArgs extends EventArgs {
    public firstValue: number;
    public lastValue: number;

    constructor(firstValue: number, lastValue: number) {
        super();

        this.firstValue = firstValue;
        this.lastValue = lastValue;
    }
}

export { OptionsEventArgs, ValuesChangeEventArgs, EventArgs };