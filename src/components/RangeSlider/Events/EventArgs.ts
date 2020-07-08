
import { Options, IOptions } from "../MVP/Model/Options";

class EventArgs {
    /* eventTarget: Object;

    constructor(eventTarget: Object){

    } */
}

class OptionsEventArgs extends EventArgs {
    public options: Options | undefined = undefined;
}
 
class OptionsToUpdateEventArgs extends EventArgs {
    public options: IOptions;

    constructor(options: IOptions) {
        super();

        this.options = options;
    }
}

export { OptionsEventArgs, OptionsToUpdateEventArgs, EventArgs };